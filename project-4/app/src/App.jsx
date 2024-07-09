import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL="http://localhost:9000";

// [
//   {
//       "name": "Boilded Egg",
//       "price": 10,
//       "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//       "image": "/images/egg.png",
//       "type": "breakfast"
//   },
// ]


const App = () => {
  const [data,setData]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [filteritem,setFilter]=useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  
  useEffect(()=>{
    
    const fetchData=async ()=>{
      setLoading(true);
    try{
        const resp= await fetch(BASE_URL);
        const json=await resp.json();
        setData(json);
        setFilter(json);
        setLoading(false);
        

    }catch(error){
        setError("unable to fetch data..");
    }
  }
  
  fetchData();
  },[]);
  const handler=(e)=>{
    const searchVal=e.target.value;
    if(searchVal===""){
      setFilter(null);
    }
    const val=data?.filter((food)=>food.name.toLowerCase().includes(searchVal.toLowerCase()))
    
    setFilter(val)
    
  }
  // const allHandler=()=>{
  //     setFilter(data)
  // }
  // const breakfastHandler=()=>{
  //   const val=data?.filter((food)=>food.type.toLowerCase()==="breakfast");
    
  //   setFilter(val)
  // }
  // const lunchHandler=()=>{
  //   const val=data?.filter((food)=>food.type.toLowerCase()==="lunch");
    
  //   setFilter(val)
  // }
  // const dinnerHandler=()=>{
  //   const val=data?.filter((food)=>food.type.toLowerCase()==="dinner");
    
  //   setFilter(val)
  // }
  const filterFood = (type) => {
    if (type === "all") {
      setFilter(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      (food.type.toLowerCase().includes(type.toLowerCase()))
    );
    setFilter(filter);
    setSelectedBtn(type);
  };
  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  if(error) return <div>{error}</div>;
  if(loading)return <div>loading...</div>;
  return (
    
    <Container>
        
        <Topsection>
            <Top className="jk">
              <div className="div1">
                <p>F<span>oo</span>dy Z<span>o</span>ne</p>
              </div>
              <div className="div2">
                  <input type="text" onChange={handler} id="search" placeholder=" Search Food..."/>
              </div>
            </Top>
            <div className="jl">
              
              {/* <Buttons onClick={allHandler}>All</Buttons>
              <Buttons onClick={breakfastHandler}>Breakfast</Buttons>
              <Buttons onClick={lunchHandler}>Lunch</Buttons>
              <Buttons onClick={dinnerHandler}>Dinner</Buttons>
               */}
            {filterBtns.map((value) => (
            <Buttons
              // isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Buttons>
          ))}
            </div>
            
        </Topsection>
        
        
        <SearchResult filteritem={filteritem} />
        
    </Container>

    
    
  )
}

export default App



export const Container=styled.div`
 
`;
const Topsection=styled.div`
  
  .jl{
    margin-top: 10px;
  }
  height: 200px;
  display: flex ;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap:45px ;
  `;
const Top=styled.div`
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  width: 80%;
  gap: 10px;
  /* justify-content: space-between; */
  .div1{
    width: 185px;
    height: 39px;
    font-weight: 700;
    font-size: 32px;
    span{
      color: red;
    }
    
  }
  .div2{
    input{
      margin-right: 20px;
      width: 285px;
      height: 40px;
      border-radius: 5px;
      border: 1px solid red;
      background: transparent;
      padding-left: 15px;
    }
  }
  `;

export const Buttons=styled.button`
    
    font-size: 16px ;
    font-weight: 100;
    padding: 6px 12px 6px 12px;
    color: white;
    background-color: #FF4343 ;
    border: none;
    border-radius: 5px;
    margin: 5px;
  `;