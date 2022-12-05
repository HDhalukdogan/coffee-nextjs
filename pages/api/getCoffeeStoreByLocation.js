import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoreByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query;

        const response = await fetchCoffeeStores(latLong, limit);
        console.log('response', response)
        res.status(200);
        res.json(response);
    } catch (err) {
        console.log('There is an error', err)
        res.status(500);
        res.json({message:"Oh no! Something went wrong",err})
    }
}

export default getCoffeeStoreByLocation;