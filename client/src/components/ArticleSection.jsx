import { useEffect, useState } from 'react';
import '../styles/ArticleSection.css'
import Button from  './Button';
import Searchbar from './Searchbar';
import CardsContainer from './CardsContainer'
import RegularCard from './RegularCard';
import { API_URL } from '../constants';

const cards = [
    {_id: 1, title: "fjsaj", date: Date.now(), cover_photo: '/preview.png', content: "hehehe"},
    {_id: 2, title: "fakkaka", date: Date.now(), cover_photo: '/preview.png', content: "mwehhe"},
    {_id: 3, title: "hahahaha", date: Date.now(), cover_photo: '/preview.png', content: "Cgadg"},
    {_id: 4, title: "hahaieie", date: Date.now(), cover_photo: '/preview.png', content: "fkakg"},
    {_id: 5, title: "mwhehehe", date: Date.now(), cover_photo: '/preview.png', content: "fakkf"},

]

const ArticleSection = () => {

    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState('');
    const [cards, setCards] = useState([])

    const isCardMatch = (val, card) => {
        const titleMatch = card.title.toLowerCase().includes(val.toLowerCase().trim());
        return (val.length != 0 && titleMatch) || val.length == 0;
      };

    const handleCardSearch = (value) => {
        
        const cardsMatched = []

        setSearchText(value);
        cards.forEach((card) =>{
            if (isCardMatch(value, card)) {
                cardsMatched.push(<RegularCard key={card._id} {...card}/>)
            }
        })

        setSearchResult(cardsMatched);
    };

    useEffect(() => {
        handleCardSearch(searchText);
        
        const fetchData = async () => {
          try {
            const response = await fetch(`${API_URL}/posts`)
            const data = await response.json();
            setCards(data);
          } catch (error) {
            console.error(error);
          } 
        };
    
        fetchData();
    
      }, []);
    

    return(
        <div id="articleSection">
            <div className="article-sec-heading-container">
                <p className="article-sec-heading">Learn About Everything Tech!</p>
                <p className="article-sec-subheading">brought to you by AWSCC Department of Software and Web Development</p>
            </div>
            {cards.length > 0 &&
            <div className="article-top-container">
                <Button variant={"primary"}>Create Article</Button>
                <Searchbar searchText={searchText} setSearchText = {handleCardSearch}/>
            </div>
            }
            <CardsContainer isEmpty={cards.length === 0} filterResult={searchResult} searchText={searchText}/>
        </div>
    );
}

export default ArticleSection;