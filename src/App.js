import React , { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from './Pagination';
// import Posts from './Posts';

const App = () => {
  const [bestData, setBestData ] =useState([]);
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [PostsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPosts = currentPage * PostsPerPage
  const indexOfFirstPost = indexOfLastPosts - PostsPerPage
  const currentPosts = filteredSearch.slice(indexOfFirstPost, indexOfLastPosts)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  //select
  const [select, setSelect] = useState('')

  //select에서 설정 변경할때 useEffect내에서 접근이 되지않아 useRef로 만들어서 접급하였습니다.
  const inputl = useRef('name')
  const inputel = useRef('store_name')

  //  useEffect, axios를 이용하여 데이터를 가져옵니다.
  useEffect(() => {
    axios
      .get("http://13.125.199.45:8000/record/user?limit=100")
      .then((res) => {
        setBestData(res.data.ranking);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);



    //아래에 2개의  useEffect가 있는데 하나는 default 값 그리고 그 아래는 select가 name선택시, store_name선택시 나올 결과값들입니다.
    useEffect(() => {
      setFilteredSearch(
        bestData.filter(country =>
          country.name.includes(search)
        )
      );
    }, [search, bestData]);
    
    useEffect(()=>{
      if(select === inputl.current){
        setFilteredSearch(
          bestData.filter(country =>
            country.name.includes(search)
          )
        );
      }else if (select === inputel.current){
        setFilteredSearch(
          bestData.filter(country=>
            country.store_name.includes(search))
        )
      }
    }, [search, bestData])

  // select의 etargetvalue.
   const handleChange=(event)=>{
      setSelect(event.target.value);
    }

    useEffect(()=>{
      console.log('select',PostsPerPage)
    })

  return (
    <Mapdiv>
      <Filtertable>
        <Filtertr>
          <Filterth>매장</Filterth>
          <Filterth>직급</Filterth>
        </Filtertr>
      </Filtertable>
      <div>검색</div>
      <Searchdiv>
        <Selectbox value={select} onChange={handleChange}>
          <option value="name">이름</option>
          <option value="store_id">매장</option>
          <option value="store_name">직급</option>
        </Selectbox>
        <MapSearch
          type="text"
          placeholder="Search.."
          onChange={(e) => setSearch(e.target.value)}
        />
      </Searchdiv>

      <Maptable>
        <Maptr>
          <Mapth>이름</Mapth>
          <Mapth>매장</Mapth>
          <Mapth>직급</Mapth>
          <Mapth>관리</Mapth>
        </Maptr>
        {/* <Posts filteredSearch={currentPosts}/> */}
        {currentPosts &&
          currentPosts.map((item) => {
            return (
              <Maptr>
                <Mapth>{item.name}</Mapth>
                <Mapth>{item.store_id}</Mapth>
                <Mapth>{item.store_name}</Mapth>
                <Mapth></Mapth>
              </Maptr>
            );
          })}
      </Maptable>
      {/* <Mapbutton onClick={getSecondPage}>&lt;더보기&gt;</Mapbutton> */}
      <Pagination postsPerPage={PostsPerPage} totalPosts={filteredSearch.length} paginate={paginate}/>
    </Mapdiv>
  )

}





const Mapdiv = styled.div``; //최상위 div

// filter 하는 테이블 부분
const Filtertable = styled.table`
  width: 200px;
  height: 20px;
  font-size: 10px;
  border: 1px solid #cccfcb;
  line-height: 20px;

  margin-top: 10px;
  margin-bottom: 10px;
`;
const Filtertr = styled.tr`
  border: 1px solid #cccfcb;
`;
const Filterth = styled.th`
  border: 1px solid #cccfcb;
`;

const Searchdiv = styled.div``
const Selectbox = styled.select``


const MapSearch = styled.input``;

// 직원 information 부분
const Maptable = styled.table`
  border: 1px solid #cccfcb;
  width: 400px;
  font-size: 10px;
`;
const Maptr = styled.tr`
  border: 1px solid #cccfcb;
`;
const Mapth = styled.th`
  border: 1px solid #cccfcb;
`;
const Mapbutton = styled.button`
  margin-top: 10px;
  display: flex;
  :hover {
    cursor: pointer;
    color: red;
  }
`;

export default App