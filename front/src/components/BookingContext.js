import React, { createContext, useState } from 'react';

export const BookingContext = createContext()

export const BookingProvider = ({children}) => {

    const [bookingData, setBookingData] = useState({
        schedule: null,
        selectedSeats:null,
        counts: { adult: 0, teenager: 0, senior: 0, disabled: 0 } //인원수
      })

        //티켓팅 할때 내가 클릭할 값에 대한 정보를 
        //movie,schedule,theater -> 내가 초기값을 null로줌
        //주현언니랑 같이 쓰는 파일이라 theater = null;만 하면됨 --> 완료
        //서울 을 클릭하면 시네마 아이디를 가지고 상영 스케줄 table에 cinema_id를 넣어서 스케줄을 찾은다음 스케줄에서 movie_id를뽑아
        //그 movie_id로 영화 movies테이블에서 movie_id랑 연령대 가져와서 react영화 선택에 띄워야된다4
        //날짜뛰우고
        //클릭 안했을떄는 전체값을 보여주고 클릭하면 그 영화가 상영하는 시간만 알려주기
        //영화movie_id만 클릭하고 날짜 클릭하면 거기에 일치하는 스케줄을 띄우면됨
        //마지막에 정리하면 이미지 말고 선택한 스케줄만 띄우고 10:20~12:20(5관) - 본 영화는 15ㅔ 관람가 어쩌구 그거는 띄우고 인원/좌석 선택 누르면 그 페이지로 넘어가게

        //세세한거는 주현언니 파일 보면서 확인하기

      

    return (
        <BookingContext.Provider value={{bookingData,setBookingData}}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;