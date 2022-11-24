import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import cls from "classnames";

import styles from "../../styles/coffee-store.module.css";
// import { fetchCoffeeStores } from "../../lib/coffee-stores";

// import { StoreContext } from "../../store/store-context";

// import { isEmpty } from "../../utils";


import coffeeStoresData from "../../data/coffee-stores.json"

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    //const coffeeStores = await fetchCoffeeStores();
    //const findCoffeeStoreById = coffeeStores.find(coffeeStore => { return coffeeStore.id.toString() === params.id });//dynamic id
    const findCoffeeStoreById = coffeeStoresData.find(coffeeStore => { return coffeeStore.id.toString() === params.id });//dynamic id
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
        }, // will be passed to the page component as props
    }
}
// export async function getStaticPaths() {
//     const coffeeStores = await fetchCoffeeStores();
//     const paths = coffeeStores.map((coffeeStore) => {
//       return {
//         params: {
//           id: coffeeStore.id.toString(),
//         },
//       };
//     });
//     return {
//       paths,
//       fallback: true,
//     };
//   }
export function getStaticPaths() {
    const paths = coffeeStoresData.map(coffeeStore => {
        return { params: { id: coffeeStore.id.toString() } }
    })
    return {
        paths,
        fallback: true
    }
}

const CoffeeStore = (initialProps) => {
    const router = useRouter();
    const [vote, setVote] = useState(1)

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    // const id = router.query.id;

    //const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

    // const {
    //     state: { coffeeStores },
    //   } = useContext(StoreContext);

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const {
                id,
                name,
                voting,
                imgUrl,
                neighbourhood,
                address
            } = coffeeStore;
            const response = await fetch('/api/createCoffeeStore', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imgUrl,
                    neighbourhood: neighbourhood || "",
                    address: address || ""
                }),
            })

            const dbCoffeeStore = await response.json();
        } catch (error) {
            console.error('Error creating coffee store', error);
        }
    }


    // useEffect(() => {
    //     if (isEmpty(initialProps.coffeeStore)) {
    //         if (coffeeStores.length > 0) {
    //             const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
    //                 return coffeeStore.id.toString() === id; //dynamic id
    //             });
    //             if (coffeeStoreFromContext) {
    //                 setCoffeeStore(coffeeStoreFromContext);
    //                 handleCreateCoffeeStore(coffeeStoreFromContext)
    //             }
    //         }
    //     } else {
    //         handleCreateCoffeeStore(initialProps.coffeeStore)
    //     }
    // }, [id, initialProps,initialProps.coffeeStore]);


    const { address, name, neighbourhood, imgUrl } = initialProps.coffeeStore;

    const handleUpvoteButton = () => {
        setVote(s => ++s)
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imgUrl}
                        width={600}
                        height={360}
                        className={styles.storeImg}
                        alt={name}
                    />
                </div>

                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24" />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>{vote}</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;