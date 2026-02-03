/**
 * MailerLite API Client
 * 
 * Handles adding subscribers to MailerLite groups for automated email sequences.
 * 
 * @see https://developers.mailerlite.com/docs/subscribers.html
 */

const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

export interface AddSubscriberPayload {
    email: string;
    name?: string;
    groupIds?: string[];
    fields?: Record<string, string>;
}

export interface MailerLiteSubscriber {
    id: string;
    email: string;
    status: string;
    source: string;
    created_at: string;
    updated_at: string;
    fields?: {
        name?: string;
        last_name?: string;
        [key: string]: string | undefined;
    };
}

/**
 * Add or update a subscriber in MailerLite.
 * 
 * MailerLite automatically upserts - if subscriber exists, it updates them.
 * 
 * @param payload Subscriber details including email and optional groups
 * @returns Created/updated subscriber data from MailerLite
 * @throws Error if API call fails
 */
export async function addSubscriberToMailerLite(payload: AddSubscriberPayload): Promise<MailerLiteSubscriber> {
    const apiKey = process.env.MAILERLITE_API_KEY;

    if (!apiKey) {
        throw new Error('MailerLite API key not configured');
    }

    const requestBody: Record<string, unknown> = {
        email: payload.email,
    };

    if (payload.name) {
        requestBody.fields = {
            name: payload.name,
            ...payload.fields,
        };
    } else if (payload.fields) {
        requestBody.fields = payload.fields;
    }

    if (payload.groupIds && payload.groupIds.length > 0) {
        requestBody.groups = payload.groupIds;
    }

    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        console.error('[MailerLite] API Error:', error);
        throw new Error(`MailerLite Error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return data.data as MailerLiteSubscriber;
}

/**
 * Get the MailerLite Group ID based on the plan ID.
 * 
 * Maps ViraLogic plan names to MailerLite group IDs from env variables.
 * 
 * @param planId The ViraLogic plan ID ('starter', 'pro', 'vip')
 * @returns The corresponding MailerLite group ID
 */
export function getGroupIdByPlan(planId: string): string | null {
    const normalizedPlanId = planId.toLowerCase().trim();

    const mapping: Record<string, string | undefined> = {
        'starter': process.env.MAILERLITE_GROUP_STARTER,
        'pro': process.env.MAILERLITE_GROUP_PRO,
        'vip': process.env.MAILERLITE_GROUP_VIP,
        'vip_mentorship': process.env.MAILERLITE_GROUP_VIP,
        'mentorship': process.env.MAILERLITE_GROUP_VIP,
        'vip masterclass': process.env.MAILERLITE_GROUP_VIP,
    };

    return mapping[normalizedPlanId] || null;
}

/**
 * Check if MailerLite integration is properly configured.
 * 
 * @returns true if API key is set
 */
export function isMailerLiteConfigured(): boolean {
    return !!process.env.MAILERLITE_API_KEY;
}

/**
 * Sync a new customer to MailerLite after successful payment.
 * 
 * This is the main entry point for integrating with PayOS webhooks.
 * 
 * @param email Customer email
 * @param planId Plan purchased ('starter', 'pro', 'vip')
 * @param customerName Optional customer name
 * @returns true if synced successfully, false otherwise
 */
export async function syncCustomerToMailerLite(
    email: string,
    planId: string,
    customerName?: string
): Promise<boolean> {
    if (!isMailerLiteConfigured()) {
        console.warn('[MailerLite] Not configured, skipping sync');
        return false;
    }

    const groupId = getGroupIdByPlan(planId);
    const groupIds = groupId ? [groupId] : [];

    if (!groupId) {
        console.warn(`[MailerLite] No group configured for plan: ${planId}, adding subscriber without group`);
    }

    try {
        const subscriber = await addSubscriberToMailerLite({
            email,
            name: customerName,
            groupIds,
        });

        console.log(`[MailerLite] Successfully added ${email} to plan ${planId}:`, subscriber.id);
        return true;
    } catch (error) {
        console.error(`[MailerLite] Failed to add ${email}:`, error);
        return false;
    }
}
