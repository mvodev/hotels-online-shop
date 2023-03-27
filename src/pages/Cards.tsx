import { useParams } from "react-router";

const Cards = () => {
  const params = useParams();
  const current = params.id;
  console.log(params)

  return <h1>Cards</h1>

}

export default Cards;