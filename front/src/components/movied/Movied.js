import React, { useEffect, useRef, useState } from 'react';

import '../../css/movied/movied.css' 
import NowMovies from './NowMovies';
import RecommendMovies from './RecommendMovies';
import { useParams } from 'react-router-dom';

const Movied = () => {

    const {on} = useParams();
    
    const [visible, setVisible] = useState(true);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);

    useEffect(() => {
        if (on === '1') {
            setVisible(true);  // 'on'이 1이면 visible을 true로 설정
        } else if (on === '2') {
            setVisible(false); // 그 외의 값이면 false로 설정
        }
    }, [on]);

    const onNow = () => {
        setVisible(true)
    }

    const onRec = () => {
        setVisible(false)
    }
    
    const onOpen = (id) => {
        setHoveredMovieId(id);
    };

    const onClose = () => {
        setHoveredMovieId(null);
    };

    return (
        <div id='contentse' className='contents_movie_liste'>
            <h2 className='hiddene'>영화목록</h2>
            <div className='movie_screen_boxe'>
                <ul className='tab_btn_type1e'>
                    <li className={`${visible ? 'actives' : 'activef'}`}>
                    <button type="button" className='buttone' onClick={onNow}>
                        <span>현재 상영작</span>
                    </button>
                    </li>
                    <li className={`${visible ? 'activef' : 'actives'}`}>
                    <button type="button" className='buttone' onClick={onRec}>
                            <span>Sally 추천작</span>
                        </button>
                    </li>
                </ul>
                {
                    visible ? 
                        <NowMovies
                            hoveredMovieId={hoveredMovieId}
                            onOpen={onOpen}
                            onClose={onClose}
                        /> :
                        <RecommendMovies
                            hoveredMovieId={hoveredMovieId}
                            onOpen={onOpen}
                            onClose={onClose}
                        />
                }
            </div>
        </div>
    );
};

export default Movied;