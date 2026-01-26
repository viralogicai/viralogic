/**
 * GetResponse API Client
 * 
 * Handles adding contacts to GetResponse campaigns for automated email sequences.
 * 
 * @see https://apireference.getresponse.com/
 */

const GETRESPONSE_API_URL = 'https://api.getresponse.com/v3';

export interface AddContactPayload {
    email: string;
    name?: string;
    campaignId: string;
    dayOfCycle?: number; // 0 = start from Day 0
    customFields?: { customFieldId: string; value: string[] }[];
}

export interface GetResponseContact {
    contactId: string;
    email: string;
    name?: string;
    createdOn: string;
}

/**
 * Add a contact to a GetResponse campaign and start their autoresponder cycle.
 * 
 * @param payload Contact details including email, campaignId, and dayOfCycle
 * @returns Created contact data from GetResponse
 * @throws Error if API call fails
 */
export async function addContactToGetResponse(payload: AddContactPayload): Promise<GetResponseContact> {
    const apiKey = process.env.GETRESPONSE_API_KEY;

    if (!apiKey) {
        throw new Error('GetResponse API key not configured');
    }

    const response = await fetch(`${GETRESPONSE_API_URL}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': `api-key ${apiKey}`,
        },
        body: JSON.stringify({
            email: payload.email,
            name: payload.name,
            campaign: { campaignId: payload.campaignId },
            dayOfCycle: payload.dayOfCycle ?? 0,
            customFieldValues: payload.customFields,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        console.error('[GetResponse] API Error:', error);
        throw new Error(`GetResponse Error: ${error.message || error.httpStatus || response.statusText}`);
    }

    return response.json();
}

/**
 * Get the GetResponse Campaign ID based on the plan ID.
 * 
 * Maps ViraLogic plan names to GetResponse campaign IDs from env variables.
 * 
 * @param planId The ViraLogic plan ID ('starter', 'pro', 'vip')
 * @returns The corresponding GetResponse campaign ID
 */
export function getCampaignIdByPlan(planId: string): string | null {
    const normalizedPlanId = planId.toLowerCase().trim();

    const mapping: Record<string, string | undefined> = {
        'starter': process.env.GETRESPONSE_CAMPAIGN_STARTER,
        'pro': process.env.GETRESPONSE_CAMPAIGN_PRO,
        'vip': process.env.GETRESPONSE_CAMPAIGN_VIP,
    };

    return mapping[normalizedPlanId] || null;
}

/**
 * Check if GetResponse integration is properly configured.
 * 
 * @returns true if API key is set
 */
export function isGetResponseConfigured(): boolean {
    return !!process.env.GETRESPONSE_API_KEY;
}

/**
 * Sync a new customer to GetResponse after successful payment.
 * 
 * This is the main entry point for integrating with PayOS webhooks.
 * 
 * @param email Customer email
 * @param planId Plan purchased ('starter', 'pro', 'vip')
 * @param customerName Optional customer name
 * @returns true if synced successfully, false otherwise
 */
export async function syncCustomerToGetResponse(
    email: string,
    planId: string,
    customerName?: string
): Promise<boolean> {
    if (!isGetResponseConfigured()) {
        console.warn('[GetResponse] Not configured, skipping sync');
        return false;
    }

    const campaignId = getCampaignIdByPlan(planId);

    if (!campaignId) {
        console.warn(`[GetResponse] No campaign configured for plan: ${planId}`);
        return false;
    }

    try {
        const contact = await addContactToGetResponse({
            email,
            name: customerName,
            campaignId,
            dayOfCycle: 0, // Start from Day 0
        });

        console.log(`[GetResponse] Successfully added ${email} to campaign ${planId}:`, contact.contactId);
        return true;
    } catch (error) {
        console.error(`[GetResponse] Failed to add ${email}:`, error);
        return false;
    }
}
