import React, { useEffect, useState } from "react";
import "../../css/SH/Showmovie.css";
import axios from "axios";

const Showmovie = ({ onCancel, userId }) => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellationCompleted, setCancellationCompleted] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookingsAndPayments = async () => {
    try {
      setLoading(true);
      const bookingsResponse = await axios.get(`/sallybox/mypage/booking/${userId}`);
      const paymentsResponse = await axios.get(`/sallybox/mypage/payment/${userId}`);

      //console.log('Bookings:', bookingsResponse.data);
      //console.log('Payments:', paymentsResponse.data);

      const bookingsData = bookingsResponse.data;
      const paymentsData = paymentsResponse.data;

      const combinedData = bookingsData.map(booking => {
        const payment = paymentsData.find(p => p.bookingNum === booking.bookingNum);
        return { ...booking, payment };
      });

      //console.log('Combined Data:', combinedData);
      
      const sortedBookings = combinedData
        .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
        .filter(
          (booking, index, self) =>
            index === self.findIndex((b) => b.bookingNum === booking.bookingNum)
        );

      //console.log('sortedBookings :', sortedBookings);

      setBookings(sortedBookings);
      setLoading(false);
    } catch (err) {
      console.error("예매 내역을 가져오는 중 오류 발생:", err);
      setError("예매 내역을 불러오는 데 실패했습니다.");
      setLoading(false);
    }
  };

  const handleCancel = async (bookingNum, pointUsage) => {
    if (window.confirm("결제를 취소하시겠습니까?")) {
      setCancelling(true);
      console.log('booking.num:'+bookingNum);
      console.log('pointUsage:'+pointUsage);
      try {

        await axios.get('/sallybox/mypage/cancel', {
            params: {
              userId: userId,
              bookingNum: bookingNum,
              pointUsage: pointUsage
            }
        });

        console.log("pointUsage"+pointUsage);
        setCancellationCompleted(true);
        // 취소 후 예매 목록을 다시 불러옵니다.
        await fetchBookingsAndPayments();
        setTimeout(() => {
          onCancel();
        }, 2000);
      } catch (err) {
        console.error("결제 취소 중 오류 발생:", err);
        setError("결제 취소에 실패했습니다.");
      } finally {
        setCancelling(false);
      }
    }
  };

  useEffect(() => {
    fetchBookingsAndPayments();
  }, [userId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  //console.log(bookings.payment);

  return (
    <div>
  {cancellationCompleted ? (
    <div className="cancellation-message">
      <div className="ticket_list">
        <div className="date">{bookings[0].bookingDate}</div>
        <ul className="ticket_info new2020">
          <li className="new_day open cancel_check" id="keyO">
            <button type="button" id="title0" aria-expanded="false">
              <strong className="tit">결제가 취소되었습니다.</strong>
              <span className="txt_col7 ty2">취소 완료</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    bookings.map((booking, index) => (
      <div key={booking.bookingNum} className="ticket_list">
        <div className="date">
          {new Date(booking.bookingDate).toLocaleDateString()}{" "}
          <span className="week">
            ({new Date(booking.bookingDate).toLocaleString("ko-KR", { weekday: "short" })})
          </span>
        </div>
        <ul className="ticket_info new2020">
          <li className="new_day open cancel_check" id={`key${index}`}>
            <button type="button" id={`title${index}`} aria-expanded="false">
              <strong className="tit">{booking.movieTitle}</strong>
              <span className="num">예매순서 {index + 1}</span>
              <span className="num">예매번호 {booking.bookingNum}&nbsp;&nbsp;&nbsp;</span>
              <span className="txt_col7 ty2">취소가능</span>
            </button>

            <div className="ticket">
              <div className="info_area">
                <div className="img">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${booking.posterPath}`}
                    alt={booking.movieTitle}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="info">
                  <dl>
                    <dt>상영일시</dt>
                    <dd>
                      <em>{new Date(booking.startTime).toLocaleDateString()}</em> (
                      {new Date(booking.startTime).toLocaleString("ko-KR", { weekday: "short" })})
                      <em className="inter">
                        {new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ~{" "}
                        {new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </em>
                    </dd>
                  </dl>
                  <dl>
                    <dt>상영관</dt>
                    <dd>
                      {booking.cinemaName} {booking.screenNo}관
                    </dd>
                  </dl>
                  <dl>
                    <dt>관람인원</dt>
                    <dd>{booking.peopleDetails}</dd>
                  </dl>
                  <dl>
                    <dt>좌석</dt>
                    <dd>
                      <em>{booking.seatNumbers}</em>
                    </dd>
                  </dl>
                </div>
                <div className="btn_wrap">
                <button 
                  onClick={() => handleCancel(booking.bookingNum, booking.payment.pointUsage)} 
                  className="btn_col3 ty5"
                >
                  결제취소
                </button>
                </div>
              </div>
            </div>

            {/* 각 예매에 해당하는 결제 정보 표시 */}
            {booking.payment && (
                <div className="payment_area">
                  <dl className="date_pay">
                    <dt>결제일시</dt>
                    <dd>
                      <em>{new Date(booking.payment.paymentDate).toLocaleString()}</em>    
                    </dd>
                  </dl>
                <div className="payment_area total_pay"> 
                  <div className="pay_area">
                      <dl className="pay">
                      <dt>주문금액</dt>
                        <dd>
                          <em>{booking.payment.price.toLocaleString()}</em>원
                        </dd>
                      </dl>
                    </div>
                        <div className="pay_area dotline bgnone">
                          <dl className="minus">
                            <dt>할인금액</dt>
                            <dd>
                              <em>{booking.payment.pointUsage.toLocaleString()}</em>원
                            </dd>
                          </dl>
                        </div>
                        <div className="pay_area">
                          <dl className="pay">
                            <dt>총 결제 금액</dt>
                            <dd className="txt_color">
                              <em>{booking.payment.totalPayment.toLocaleString()}</em>원
                            </dd>
                          </dl>
                          <br/>
                          <div className="number">
                            <span class="txt_card1 ty1">{booking.payment.paymentMethod}</span>
                          </div>
                        </div>
                        
                 </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    ))
  )}
</div>
  );
};

export default Showmovie;
