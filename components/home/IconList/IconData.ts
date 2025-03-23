import { IconSource } from "react-native-paper/lib/typescript/components/Icon"

type TIconList = {
    icon: IconSource;
    title: string;
    color: string;
}

export const iconList: TIconList[] = [
{ icon: "content-cut", title: "Barbers", color: 'black'},
{ icon: "trophy-award", title: "Top-Rated", color: '#333'},
{ icon: "google-my-business", title: "Shops", color: "#333"},
{ icon: "walk", title: "on-Demand", color: "#333"},
{ icon: "cash-multiple", title: "Offers", color: '#0c6517'},
];