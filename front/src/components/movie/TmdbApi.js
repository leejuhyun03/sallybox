import axios from "axios";

const API_KEY = 'c1fe680d16ac165e297b9bf72e80e897';
const BASE_URL = 'https://api.themoviedb.org/3';

//영화 상세 정보 가져오기
// 영화 상세 정보 가져오기
export const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  };
  
  // 출연진 정보 가져오기
  export const fetchCredits = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching credits:", error);
      throw error;
    }
  };
  
  // 트레일러 정보 가져오기
  export const fetchTrailers = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching trailers:", error);
      throw error;
    }
  };
  
  // 리뷰 정보 가져오기
  export const fetchReviews = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  };
  
  // 이미지 정보 가져오기
  export const fetchImages = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/images`, {
        params: { api_key: API_KEY },
      });
      return response.data.backdrops;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };
  
  // 배우 상세 정보 가져오기
  export const fetchActorDetails = async (actorId) => {
    try {
      const response = await axios.get(`${BASE_URL}/person/${actorId}`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching actor details:", error);
      throw error;
    }
  };
  
  // 배우 출연작 목록 가져오기
  export const fetchActorCredits = async (actorId) => {
    try {
      const response = await axios.get(`${BASE_URL}/person/${actorId}/movie_credits`, {
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        },
      });
      return response.data.cast;
    } catch (error) {
      console.error("Error fetching actor credits:", error);
      throw error;
    }
  };