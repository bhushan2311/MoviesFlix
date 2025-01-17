import  React, {useState, useEffect, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies';
import PaginationComponent from '../../Components/Pagination';
import { AppContext } from '../../context';

const  HomeContainer = ({category, heading})=>{
    const [content, setContent] = useState([]);
    const [pageno, setPageno] = useState(1)
    const [paginationno, setPaginationno] = useState(500);
    const [totalResults, setTotalResults] = useState();

    const {search_movie} = useContext(AppContext);

    const GetData = async ()=>{
        let url;
        if(search_movie){
            url = `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${search_movie}&page=${pageno}`;
        }
        else{
            url = `https://api.themoviedb.org/3/movie/${category}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pageno}`;
        }
        const {data} = await axios.get(url)   // task
        setTotalResults(data.total_results);
        setContent(data.results);
        // setPaginationno(data.total_pages);       // cant set more than 500 pages: issue in api as total pages is only limit upto 500 even if it shows more than 500
    }

    useEffect(()=>{
        console.log('Trending Component did mount', process.env);
        GetData();
    }, [])

    const handleClick = (number)=>{
        setPageno(number);
    }
    useEffect(()=>{
        GetData();
    }, [pageno,category, search_movie])
    return (
        <main className='homePage'>
            <Container>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>{heading} Movies</h1>
                        </section>
                    </Col>
                <Row>
                    {totalResults!==0? (
                        content && content.length > 0 ? content.map((item, index)=>{
                            return (<CardMoviesComponents key={index} data={item} />)
                        }) : <p>Loading...</p>   
                    ): <p>No results for {search_movie}...</p>}

                {
                    paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ''
                }
                    
                </Row>
            </Container>
        </main>
    )
}

export default HomeContainer;