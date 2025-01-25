import MyPinCard from "@/components/Card/MyPinCard/MyPinCard";
import styles from "./EditMyPinList.module.scss";

interface Pin {
    url: string;
    alt: string;
    location: string;
    address: string;
}

const EditMyPinList = ({ list }: { list: Pin[] }) => {
    return (
        <div className={styles.mypin_list}>
            <div className={styles.head}>
                <h1 className={styles.title}>내가 올린 핀</h1>
                <a className={styles.button+` edit`}><span>편집</span></a>
            </div>
            <ul className={styles.list}>
                {list.map((pin, index) => (
                    <li key={index}><MyPinCard url={pin.url} alt={pin.alt} location={pin.location} address={pin.address} /></li>
                ))}
            </ul>
        </div>
    );
}

export default EditMyPinList;