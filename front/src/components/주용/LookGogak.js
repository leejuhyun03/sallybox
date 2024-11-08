import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/jy/tab.css';
import '../../css/jy/nav.css';
import '../../css/jy/Gogaksenter.css';
import '../../css/jy/Gogakregistration.css';
import { Link } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

const LookGogak = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [showContentTitle, setShowContentTitle] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentPost, setCurrentPost] = useState({ email: '', title: '', content: '', userid: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     console.log('token: ' + token)
    
    //     if (token) {
    //       try {
    //         const decodedToken = jwtDecode(token); // JWT 디코딩
                        
    //         setCurrentPost((prevPost) => ({
    //             ...prevPost,
    //             userid: decodedToken.user_id
    //         }));
    //         console.log('userId: ' + currentPost.userid)
            
    //       } catch (error) {
    //         console.error('Invalid token:', error);
    //       }
    //     }
    //   }, []);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/inquiries");
                console.log(response.data); // 응답 데이터 확인
                setPosts(response.data);
                setFilteredPosts(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
            }
        };
        fetchData();
    }, []);

    // 검색 키워드에 따른 필터링
    useEffect(() => {
        handleSearch();
    }, [searchKeyword]);

    const handleSearch = () => {
        if (searchKeyword === "") {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post =>
                post.title?.includes(searchKeyword) || post.content?.includes(searchKeyword)
            );
            setFilteredPosts(filtered);
        }
        setCurrentPage(1);
    };

    // 제목 클릭 시 내용 토글
    const handleTitleClick = (title) => {
        setShowContentTitle(prevTitle => (prevTitle === title ? null : title));
    };

    // 수정 버튼 클릭 시 현재 게시물 설정
    const handleEdit = (post) => {
        console.log("편집할 게시물:", post); // 확인용
        setCurrentPost({ email: post.email, title: post.title, content: post.content });
        console.log("현재 수정할 게시물 상태:", { email: post.email, title: post.title, content: post.content }); // 확인
        setEditMode(true);
    };

    const handleUpdate = async () => {

        console.log("수정할 게시물 데이터:", currentPost);
        if (!currentPost.email) {
            console.error("수정할 게시물 이메일이 없습니다.");
            return;
        }
        console.log("Sending update request with data:", JSON.stringify(currentPost));
        try {
            const response = await axios.put(`http://localhost:8085/api/inquiries`, currentPost, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("게시물이 성공적으로 수정되었습니다:", response.data);
            const updatedPosts = posts.map(post =>
                post.email === currentPost.email ? { ...post, title: currentPost.title, content: currentPost.content } : post
            );
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts);
            setEditMode(false); // 수정 모드 종료
            setCurrentPost({ inquiry_id: null, title: '', content: '', email: '' }); // 현재 게시물 초기화
            setShowContentTitle(null); // 수정 후 게시물 제목 숨기기
        } catch (error) {
            console.error("게시물을 수정하는 데 오류가 발생했습니다:", error);
        }
    };
    // 게시물 삭제
    const handleDelete = async (post) => {
        if (!post.title) {
            console.error("삭제할 게시물 제목이 없습니다.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8085/api/inquiries`, { data: { title: post.title } });
            console.log("게시물이 성공적으로 삭제되었습니다:", response.data);

            const updatedPosts = posts.filter(p => p.title !== post.title || p.email !== post.email);
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts);

            if (showContentTitle === post.title) {
                setShowContentTitle(null);
            }
        } catch (error) {
            if (error.response) {
                console.error("서버 응답:", error.response.data);
                console.error("서버 상태 코드:", error.response.status);
            } else if (error.request) {
                console.error("요청이 이루어졌으나 응답을 받지 못했습니다:", error.request);
            } else {
                console.error("게시물을 삭제하는 데 오류가 발생했습니다:", error.message);
            }
        }
    };

    // 페이지네이션 로직
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <fieldset className="search_wrap ty2" style={{ textAlign: "center" }}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    id="searchKeyword"
                    title="검색어 입력"
                />
                <button type="button" className="btn_col2" onClick={handleSearch}>
                    검색
                </button>
                <div className="txt_help_wrap">
                    <p>궁금한거 있으면 이주현 허강현 한테 물어봐주세요!</p>
                    <Link to="/sallybox/registration" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        1:1문의 바로가기
                    </Link>
                </div>
            </fieldset>

            <table className="tb_acc_wrap">
                <thead>
                    <tr>
                        <th scope="col" id="thead0">제목</th>
                    </tr>
                </thead>
                <tbody id="tab" style={{ backgroundColor: "white" }}>
                    {currentPosts.length > 0 ? (
                        currentPosts.map(post => (
                            <tr key={post.email}>
                                <td headers="thead0">
                                    <span 
                                        onClick={() => handleTitleClick(post.title)} 
                                        style={{ cursor: "pointer", fontWeight: "bold" }}
                                    >
                                        {post.title}
                                    </span>
                                    {showContentTitle === post.title && (
                                        <div className="post-content">
                                            {editMode && currentPost.email === post.email ? (
                                                <div className="edit-form">
                                                    <input
                                                        type="text"
                                                        value={currentPost.title}
                                                        onChange={(e) => {
                                                            setCurrentPost({ ...currentPost, title: e.target.value });
                                                        }}
                                                        placeholder="제목"
                                                    />
                                                    <textarea
                                                        value={currentPost.content}
                                                        onChange={(e) => {
                                                            setCurrentPost({ ...currentPost, content: e.target.value });
                                                        }}
                                                        placeholder="내용"
                                                    />
                                                    <button onClick={handleUpdate}>수정 완료</button>
                                                    <button onClick={() => {
                                                        setEditMode(false);
                                                        setCurrentPost({ email: '', title: '', content: '' });
                                                    }}>취소</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div>{post.content}</div>
                                                    <button onClick={() => handleDelete(post)}>삭제</button>
                                                    <button onClick={() => handleEdit(post)}>수정</button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="1">검색 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default LookGogak;
