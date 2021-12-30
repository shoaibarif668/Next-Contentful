import Link from "next/link"
import Image from "next/image"
import itemCardStyle from "../styles/ItemCard.module.scss"

const ItemCard = ({itemData}) => {
    const {title,slug,cookingTime,thumbnail} = itemData.fields
    return(
        <>
        <div className={itemCardStyle.card}>
            <div className={itemCardStyle.featured}>
                <Image src={`https:${thumbnail.fields.file.url}`} width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height}/>
                {/* Whitelist Contentful external domain next-config.js */}
            </div>
            <div className={itemCardStyle.content}>
                <div className={itemCardStyle.info}>
                    <h4 className={itemCardStyle.info__title}>{title}</h4>
                    <p className={itemCardStyle.info__cookingTime}>Takes approx {cookingTime} minutes to make</p>
                </div>
                <div className={itemCardStyle.actions}>
                    <Link href={`/recipes/${slug}`}>  
                        <a className={itemCardStyle.actions__link}>Cook This!</a>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default ItemCard;