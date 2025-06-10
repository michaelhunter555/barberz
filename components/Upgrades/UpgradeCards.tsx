import ResourceItem from "../shared/Resources/ResourceItem";
import { dummyImgArr } from "../BarberProfile/ShowCaseGallery";


export const UpgradeMarker = () => {
    return (
        <ResourceItem
        isOffer
        image={dummyImgArr[0].imgPath}
        header='Custom Map Marker Image'
        content='Stand out when users are searching via the explore map. Use your own custom image instead of the defaul scissors logo.'
        onViewPress={() => console.log("learn more")}
        actionText="$5 per month"
        />
    )
};

export const UpgradeToShop = () => {
    return (
        <ResourceItem
        isOffer
        image={dummyImgArr[1].imgPath}
        header='Upgrade to Shop'
        content='Are you a shop or a entreprenuer? Becoming a shop offers extended features from an individual service account.'
        onViewPress={() => console.log("learn more")}
        />
    )
};

export const UpgradeServiceLimits = () => {
    return (
        <ResourceItem
        isOffer
        image={dummyImgArr[3].imgPath}
        header='Extend your service & coupon limitations'
        content='By default users are allowed 4 coupon and 6 service add-ons. If you need more then this option is for you.'
        onViewPress={() => console.log("learn more")}
        actionText="Get 20 of each - $10"
        />
    )
};

export const GetAFeature = () => {
    return (
        <ResourceItem
        isOffer
        image={dummyImgArr[4].imgPath}
        header='Featured Placement'
        content='Get a top placement in listings in within 100 mile radius!'
        onViewPress={() => console.log("learn more")}
        actionText="Get Started"
        />
    )
};

