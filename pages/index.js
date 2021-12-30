
import { Fragment } from "react";
import ItemCard from "../components/ItemCard";
import contentfulClient from "../utils/contentful"
import itemStyle from "../styles/Item.module.scss"

export async function getStaticProps() {
  const response = await contentfulClient.getEntries({
    content_type: "recipe",
  }); //Content type id from Contentful Content Model

  return {
    props: {
      recipes: response.items,
    },
  };
}

// export async function getServerSideProps() {
//       const apiKey = process.env.REACT_APP_API_KEY
//       return {
//         props: {
//           apiKey,
//         }
//       }

//     }

export default function Recipes({recipes}) {
// console.log(recipes)
  return (
    <>
    <div className={itemStyle.recipe_list}>
      {recipes && recipes.map((data)=>(
        <Fragment key={data.sys.id}>
          <ItemCard itemData={data}/>
        </Fragment>
      ))}
    </div>
    </>
  );
}
