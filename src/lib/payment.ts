import { prisma } from "@/lib/prisma";

export type PaymentDetails = {
  jazzcash: string;
  easypaisa: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
};

function envDefaults(): PaymentDetails {
  return {
    jazzcash: process.env.JAZZCASH_NUMBER ?? "0300-0000000",
    easypaisa: process.env.EASYPAISA_NUMBER ?? "0300-0000000",
    bankName: process.env.BANK_NAME ?? "HBL",
    accountTitle: process.env.BANK_ACCOUNT_TITLE ?? "AG Traders",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER ?? "0000-0000-0000-0000",
    iban: process.env.BANK_IBAN ?? "PK00HABB0000000000000000",
  };
}

export async function getPaymentDetails(): Promise<PaymentDetails> {
  try {
    const settings = await prisma.paymentSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) return envDefaults();
    return {
      jazzcash: settings.jazzcashNumber,
      easypaisa: settings.easypaisaNumber,
      bankName: settings.bankName,
      accountTitle: settings.accountTitle,
      accountNumber: settings.accountNumber,
      iban: settings.iban,
    };
  } catch {
    return envDefaults();
  }
}
