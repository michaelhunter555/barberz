import { IconSource } from "react-native-paper/lib/typescript/components/Icon"

type TIconList = {
    icon: IconSource;
    title: string;
    color: string;
    link?: string;
}

export const iconList: TIconList[] = [
{ icon: "content-cut", title: "Barbers", color: 'black', link: "/barbers"},
{ icon: "trophy-award", title: "Top-Rated", color: '#333', link: "/best-rated"},
{ icon: "google-my-business", title: "Shops", color: "#333", link: "/shops"},
{ icon: "walk", title: "on-Demand", color: "#333", link: "/on-demand"},
{ icon: "cash-multiple", title: "Offers", color: '#0c6517', link: "/offers"},
];