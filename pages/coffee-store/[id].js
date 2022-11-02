import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
    const router = useRouter();
    return (
        <div>
            CoffeeStroe - {router.query.id}
            <Link href="/ ">
                <a>Back to Home</a>
            </Link>
        </div>
    );
};

export default CoffeeStore;