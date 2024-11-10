import '../../../css/SignUp/signup.css';
import React, { useRef, useState } from 'react';
import InputBox from '../../../components/InputBox';
import { useNavigate } from 'react-router-dom';
import { emailCertificationRequest, checkCertificationRequest, signUpRequest, SNS_SIGN_IN_URL } from '../../../apis';
import { ResponseCode } from '../../../types/enums';

export default function SignUp() {
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);
    const emailRef = useRef(null);
    const certificationNumberRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const nameRef = useRef(null);
    const birthRef = useRef(null);
    const nicknameRef = useRef(null);
    const signUpButtonRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [genderCode, setGenderCode] = useState('');
    const [nickname, setNickname] = useState('');

    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [isPasswordCheckError, setPasswordCheckError] = useState(false);
    const [isCertificationNumberError, setCertificationNumberError] = useState(false);
    const [isBirthError, setBirthError] = useState(false);

    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
    const [certificationNumberMessage, setCertificationNumberMessage] = useState('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [birthMessage, setBirthMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');

    const [isCertificationCheck, setCertificationCheck] = useState(false);

    const signUpButtonClass = email && password && passwordCheck && certificationNumber && phoneNumber && name && birthDate && genderCode && nickname ? 'primary-button-lg' : 'disable-button-lg';

    const emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;
    // 주민등록번호 패턴 (앞자리 6자리와 뒷자리 첫 글자)
    const isValidDate = (year, month, day) => {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
    };  

    const navigate = useNavigate();

    const emailCertificationResponse = (responseBody) => {
        if (!responseBody) return;
        const { code } = responseBody;

        if (code === ResponseCode.VALIDATION_FAIL) alert('이메일을 입력하세요.');
        if (code === ResponseCode.DUPLICATE_ID) {
            setEmailError(true);
            setEmailMessage('이미 사용중인 이메일 입니다.');
            setCertificationCheck(false);
        }
        if (code === ResponseCode.MAIL_FAIL) alert('이메일 전송에 실패하였습니다.');
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;

        setEmailError(false);
        setEmailMessage('인증번호가 전송되었습니다.');
    };

    const checkCertificationResponse = (responseBody) => {
        if (!responseBody) return;

        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('이메일, 인증번호를 모두 입력하세요.');
        if (code === ResponseCode.CERTIFICATION_FAIL) {
            setCertificationNumberError(true);
            setCertificationNumberMessage('인증번호가 일치하지 않습니다.');
            setCertificationCheck(false);
        }
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;

        setCertificationNumberError(false);
        setCertificationNumberMessage('인증번호가 확인되었습니다.');
        setCertificationCheck(true);
    };

    const signUpResponse = (responseBody) => {
        if (!responseBody) return;

        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('모든 값을 입력하세요.');
        if (code === ResponseCode.CERTIFICATION_FAIL) {
            setCertificationNumberError(true);
            setCertificationNumberMessage('인증번호가 일치하지 않습니다.');
            setCertificationCheck(false);
        }
        if (code === ResponseCode.DUPLICATE_ID) {
            setEmailError(true);
            setEmailMessage('이미 사용중인 이메일 입니다.');
            setCertificationCheck(false);
        }
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;

        navigate('/auth/sign-in');
    };

    const onEmailChangeHandler = (event) => {
        const { value } = event.target;
        setEmail(value);
        setEmailMessage('');
    };

    const onPasswordChangeHandler = (event) => {
        const { value } = event.target;
        setPassword(value);
        setPasswordMessage('');
    };

    const onPasswordCheckChangeHandler = (event) => {
        const { value } = event.target;
        setPasswordCheck(value);
        setPasswordCheckMessage('');
    };

    const onCertificationNumberChangeHandler = (event) => {
        const { value } = event.target;
        setCertificationNumber(value);
        setCertificationNumberMessage('');
    };

    const onPhoneNumberChangeHandler = (event) => {
        const { value } = event.target;
        setPhoneNumber(value);
        setPhoneNumberMessage('');
    };

    const onNameChangeHandler = (event) => {
        const { value } = event.target;
        setName(value);
        setNameMessage('');
    };

    const onBirthChangeHandler = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9]/g, '');

        //초기화
        let newBirthDate = numericValue.slice(0, 6);
        let newGenderCode = numericValue.slice(6, 7);

        if (numericValue.length <= 6) {
            setBirthDate(numericValue);
            setGenderCode('');
            setBirthMessage('');
            setBirthError(false);
        } else if (numericValue.length === 7) {
        const year = parseInt(numericValue.slice(0, 2), 10);
        const month = parseInt(numericValue.slice(2, 4), 10);
        const day = parseInt(numericValue.slice(4, 6), 10);
        const genderCode = numericValue.slice(6, 7);

        

        // 생년월일과 성별 코드 검증
        if (!isValidDate(year + 1900, month, day) && !isValidDate(year + 2000, month, day)) {
            setBirthError(true);
            setBirthMessage('올바른 생년월일이 아닙니다.전체 지우고 다시적어주세요.');
            return;
        }

        if (!['1', '2', '3', '4'].includes(genderCode)) {
            setBirthError(true);
            setBirthMessage('올바른 성별 코드가 아닙니다.전체 지우고 다시적어주세요.');
            return;
        }

        setBirthDate(numericValue.slice(0, 6));
        setGenderCode(genderCode);
        setBirthError(false);
        setBirthMessage('');
        }

        
    
    };

    const onNicknameChangeHandler = (event) => {
        const { value } = event.target;
        setNickname(value);
        setNicknameMessage('');
    };

    const onEmailButtonClickHandler = () => {
        if (!email) return;
        const checkedEmail = emailPattern.test(email);
        if (!checkedEmail) {
            setEmailError(true);
            setEmailMessage('이메일 형식이 아닙니다');
            return;
        }
        const requestBody = { email };
        emailCertificationRequest(requestBody).then(emailCertificationResponse);
    };

    const onCertificationNumberButtonClickHandler = () => {
        if (!email || !certificationNumber) return;
        const requestBody = { email, certificationNumber };
        checkCertificationRequest(requestBody).then(checkCertificationResponse);
    };

    const onSignUpButtonClickHandler = () => {
        if (!email || !password || !passwordCheck || !certificationNumber || !phoneNumber || !name || !nickname) return;
        if (!isCertificationCheck) {
            alert('이메일 인증은 필수입니다.');
            return;
        }
        const checkedPassword = passwordPattern.test(password);
        if (!checkedPassword) {
            setPasswordError(true);
            setPasswordMessage('영문, 숫자를 혼용하여 8~13자를 입력해 주세요.');
            return;
        }
        if (password !== passwordCheck) {
            setPasswordCheckError(true);
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        const requestBody = { email, password, certificationNumber, phoneNumber, name, birthDate, genderCode, nickname };
        signUpRequest(requestBody).then(signUpResponse);
    };

    const onSignInButtonClickHandler = () => {
        navigate('/auth/sign-in');
    };

    const onSnsSignInButtonClickHandler = (type) => {
        window.location.href = SNS_SIGN_IN_URL(type);
    };

    return (
        <div id='sign-up-wrapper'>
            <div className='sign-up-container'></div>
            <div className='sign-up-box'></div>
            <div className='sign-up-title'>
                <div className='SALLYBOX-logo-button'></div>
            </div>
            <div className='sign-up-content-box'>
                <div className='sign-up-content-sns-sign-in-box'></div>
                <div className='sign-up-content-sns-sign-in-title'>{'SNS 회원가입'}</div>
                <div className='sign-up-content-sns-sign-in-button-box'>
                    <div className='kakao-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('kakao')}></div>
                    <div className='naver-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('naver')}></div>
                </div>
                <div className='sign-up-content-divider'></div>
                <div className='sign-up-content-input-box'>
                    <InputBox
                        ref={emailRef}
                        title='아이디(이메일)'
                        placeholder='이메일 주소를 입력해주세요.'
                        type='text'
                        value={email}
                        onChange={onEmailChangeHandler}
                        isErrorMessage={isEmailError}
                        message={emailMessage}
                        buttonTitle='이메일 인증'
                        onButtonClick={onEmailButtonClickHandler}
                    />
                    <InputBox
                        ref={certificationNumberRef}
                        title='인증번호'
                        placeholder='인증번호 4자리를 입력해주세요.'
                        type='text'
                        value={certificationNumber}
                        onChange={onCertificationNumberChangeHandler}
                        isErrorMessage={isCertificationNumberError}
                        message={certificationNumberMessage}
                        buttonTitle='인증확인'
                        onButtonClick={onCertificationNumberButtonClickHandler}
                    />
                    <InputBox
                        ref={passwordRef}
                        title='비밀번호'
                        placeholder='비밀번호를 입력해주세요.'
                        type='password'
                        value={password}
                        onChange={onPasswordChangeHandler}
                        isErrorMessage={isPasswordError}
                        message={passwordMessage}
                    />
                    <InputBox
                        ref={passwordCheckRef}
                        title='비밀번호 확인'
                        placeholder='비밀번호를 입력해주세요.'
                        type='password'
                        value={passwordCheck}
                        onChange={onPasswordCheckChangeHandler}
                        isErrorMessage={isPasswordCheckError}
                        message={passwordCheckMessage}
                    />
                    <InputBox
                        ref={phoneNumberRef}
                        title='전화번호'
                        placeholder='전화번호를 입력해주세요.'
                        type='text'
                        value={phoneNumber}
                        onChange={onPhoneNumberChangeHandler}
                        message={phoneNumberMessage}
                    />
                    <InputBox
                        ref={nameRef}
                        title='이름'
                        placeholder='이름을 입력해주세요.'
                        type='text'
                        value={name}
                        onChange={onNameChangeHandler}
                        message={nameMessage}
                    />
                    <InputBox
                        ref={birthRef}
                        title='주민등록번호'
                        placeholder='주민등록번호를 입력해주세요.'
                        type='text'
                        value={birthDate.length === 6
                            ? `${birthDate}-${genderCode}${genderCode ? '******' : ''}`
                            : birthDate}
                        onChange={onBirthChangeHandler}
                        message={birthMessage}
                    />
                    <InputBox
                        ref={nicknameRef}
                        title='닉네임'
                        placeholder='닉네임을 입력해주세요.'
                        type='text'
                        value={nickname}
                        onChange={onNicknameChangeHandler}
                        message={nicknameMessage}
                    />
                </div>
                <div className='sign-up-content-button-box'>
                    <div ref={signUpButtonRef} className={`${signUpButtonClass} full-width`} onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                    <div className='text-link-lg full-width' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                </div>
            </div>
        </div>
    );
}

