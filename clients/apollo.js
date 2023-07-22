import { ApolloClient, InMemoryCache } from "@apollo/client";

const APClient = new ApolloClient({
    link: "https://api-mumbai.lens.dev",
    cache: new InMemoryCache(),
});

export default APClient;
