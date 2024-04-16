import '../styles/CardsContainer.css'
import MainCard from './MainCard';
import RegularCard from './RegularCard';

const CardsContainer = () => {
    return(
        <div className="article-cards-container">
            <MainCard title='All About Cloud Computing and AWS Services' date={'April 16, 2024'}/>
            <RegularCard _id={1} title={'Example Title'} date={Date.now()} cover_photo={"/preview.png"} content={'example_content'}/>
        </div>
    );
};

export default  CardsContainer; 