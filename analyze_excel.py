
import pandas as pd
import json

try:
    file_path = r'd:\Project Code Kiem Tien\prompt AI Duy Tam\Pro Prompts Pack - Vietnamese.xlsx'
    df = pd.read_excel(file_path)

    with open('excel_analysis.txt', 'w', encoding='utf-8') as f:
        f.write("COLUMNS_LIST:\n")
        for col in df.columns:
            f.write(f"COLUMN: {col}\n")
        
        f.write("\nFIRST_ROW_SAMPLE:\n")
        row = df.iloc[0].to_dict()
        for k, v in row.items():
            f.write(f"{k}: {v}\n")
    print("Done writing to excel_analysis.txt")

except Exception as e:
    print(f"Error reading excel: {e}")
