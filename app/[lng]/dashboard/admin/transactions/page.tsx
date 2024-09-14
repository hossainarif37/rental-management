"use client"
import { useEffect, useState } from "react";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { getAllTrasaction } from "@/lib/database/getTransactions";
import Loading from "@/components/ui/Loading/Loading";
import { useTranslation } from "@/app/i18n/client";


interface TransactionData {
    success: boolean;
    transactions: object[];
    // Include other properties of the transaction object here
}
const TransactionPage = ({ params: { lng } }: { params: { lng: string } }) => {
    const { t } = useTranslation(lng, "transactions");
    const [transaction, setTransaction] = useState<TransactionData | null>(null);
    // console.log(transaction);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // console.log('Setting isLoading to true');
                setIsLoading(true);
                const data = await getAllTrasaction();
                // console.log(data);
                setTransaction(data);

                // console.log('Setting isLoading to false');
                setIsLoading(false);
            } catch (error) {
                // console.log('Error occurred, setting isLoading to false', error);
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);
    if (isLoading) {
        return <Loading />
    }

    if (!transaction?.transactions || (Array.isArray(transaction?.transactions) && transaction.transactions.length === 0)) {
        return <div className='lg:min-h-screen flex-center mt-32 lg:mt-0'>
            <h1 className='lg:text-4xl text-2xl font-bold text-white-50'>{t("NO_PAYMENT_HISTORY")}</h1>
        </div>
    }

    return (
        <div className="min-h-screen md:bg-primary-50 md:px-5 py-10">
            {transaction?.success && <TransactionForm lng={lng} transaction={transaction} />}
        </div>
    );
};

export default TransactionPage;