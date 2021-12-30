import { Fragment } from "react"
import contentfulClient from "../../utils/contentful"
import Image from "next/image"
import {nanoid} from "nanoid"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export const getStaticPaths = async () => {
  const response = await contentfulClient.getEntries({
    content_type : "recipe"
  })
  
  
  const paths = response.items.map(item =>{
    return{
      params: {slug:item.fields.slug}
    }
  })
  return{
    paths:paths,
    fallback:false,
  }
}

export async function getStaticProps(context) {
//get a single item
 const response  = await contentfulClient.getEntries({
    content_type : "recipe",
    'fields.slug' : context.params.slug //it will match the fields object from the contentful data with our slug and if it matches it allows that data to show
 })
 
 return{
  props:{recipe:response.items[0]}
 }
}

export default function RecipeDetails({recipe}) {
  const {featuredImage,title,cookingTime,ingredients,method} = recipe.fields
  return (
    <>
    <div className="banner">
      <Image src={`https:${featuredImage.fields.file.url}`} width={featuredImage.fields.file.details.image.width} height={featuredImage.fields.file.details.image.height}/>
      <h2>{title}</h2>
    </div>
    <div className="info">
      <p>Take about {cookingTime} minutes to cook.</p>
      <h3>Ingredients:</h3>
      {ingredients.map((data)=>(
        <Fragment key={nanoid()}>
          <span>{data}</span>
        </Fragment>
      ))}
    </div>
    
    <div className="method">
      <h3>Method:</h3>
      <div>{documentToReactComponents(method)}</div>
    </div>
    
    <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </>
  )
}