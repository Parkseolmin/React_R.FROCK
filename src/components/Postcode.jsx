import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import * as PortOne from '@portone/browser-sdk/v2';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'hooks/useCart';
import SuccessAlert from 'ui/SuccessAlert';

const Postcode = ({ products, totalAmount }) => {
  const { removeAllItems } = useCart();
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    recipient: '',
    postcode: '',
    address: '',
    detailAddress: '',
    phone: '',
    emailUser: '',
    emailDomain: 'naver.com',
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleComplete = (data) => {
    setForm({
      ...form,
      postcode: data.zonecode,
      address: data.address,
    });
    setIsPopupOpen(false); // 주소 검색창 닫기
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (index, value) => {
    let phoneParts = form.phone.split('-');
    phoneParts[index] = value;
    const updatedPhone = phoneParts.join('-');
    setForm({ ...form, phone: updatedPhone });
  };

  const handleEmailChange = (name, value) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };
      updatedForm.email = `${updatedForm.emailUser}@${updatedForm.emailDomain}`;
      return updatedForm;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      storeId: `${process.env.REACT_APP_PORTONE_STOREID}`,
      channelKey: `${process.env.REACT_APP_PORTONE_CHANNELKEY}`,
      paymentId: `order_${Date.now()}`,
      orderName:
        products.length === 1
          ? products[0].title
          : `${products[0].title} 외 ${products.length - 1}개`,
      totalAmount: totalAmount,
      currency: 'CURRENCY_KRW',
      customer: {
        fullName: form.recipient,
        phoneNumber: form.phone,
        email: form.email,
      },
      payMethod: 'CARD',
    };

    const requestPaymentSystem = async () => {
      try {
        console.log('Payment request data:', data);
        const response = await PortOne.requestPayment(data);
        console.log('Payment response:', response);

        if (response.code == null) {
          console.log('Payment succeeded!');
          removeAllItems.mutate();
          setSuccess('주문 완료되었습니다🎇');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          console.log('Payment failed:', response.message || 'Unknown error');
          setSuccess('결제가 실패됐습니다.😭');
        }
      } catch (error) {
        console.error('Error occurred during payment:', error);
        alert('결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    requestPaymentSystem();
  };

  return (
    <form
      style={{}}
      className='flex flex-col mt-5 p-8 border border-gray-300 gap-3'
      onSubmit={handleSubmit}
    >
      <h2>배송지 정보 입력</h2>
      {/* 받는 사람 */}
      <div>
        <label>* 받는사람:</label>
        <input
          style={{
            padding: '5px 5px 5px 5px',
            fontSize: '1.1rem',
            border: 'none',
            margin: '10px',
          }}
          type='text'
          name='recipient'
          value={form.recipient}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* 주소 */}
      <label>* 주소:</label>
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'left',
          flexDirection: 'column',
        }}
      >
        <div>
          <input
            className='p-3'
            type='text'
            name='postcode'
            value={form.postcode}
            placeholder='우편번호'
            readOnly
          />
          <button
            className='border border-gray-300 p-3 ml-3'
            type='button'
            onClick={() => setIsPopupOpen(true)}
          >
            (우편번호) 주소 검색
          </button>
        </div>
        {isPopupOpen && (
          <div className='w-full'>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        )}
      </div>
      <input
        className='p-2 max-w-md'
        type='text'
        name='address'
        value={form.address}
        placeholder='기본 주소'
        readOnly
        required
      />
      <input
        className='p-2 mt-2 max-w-md'
        type='text'
        name='detailAddress'
        value={form.detailAddress}
        placeholder='나머지 주소 (선택)'
        onChange={handleInputChange}
      />
      <div className='w-full flex items-center mt-2'>
        {/* 휴대전화 */}
        <label>휴대전화:</label>
        <input
          className='ml-2 p-2 w-16'
          required
          type='text'
          maxLength='3'
          value={form.phone.split('-')[0] || ''}
          onChange={(e) => handlePhoneChange(0, e.target.value)}
        />{' '}
        -
        <input
          className='ml-2 p-2 w-20'
          required
          type='text'
          maxLength='4'
          value={form.phone.split('-')[1] || ''}
          onChange={(e) => handlePhoneChange(1, e.target.value)}
        />{' '}
        -
        <input
          className='ml-2 p-2 w-20'
          required
          type='text'
          maxLength='4'
          value={form.phone.split('-')[2] || ''}
          onChange={(e) => handlePhoneChange(2, e.target.value)}
        />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        {/* 이메일 */}
        <label>이메일:</label>
        <input
          className='ml-2 p-2'
          required
          type='text'
          name='emailUser'
          value={form.emailUser}
          placeholder='이메일 아이디'
          onChange={(e) => handleEmailChange('emailUser', e.target.value)}
        />
        @
        <select
          style={{ padding: '10px' }}
          name='emailDomain'
          value={form.emailDomain}
          onChange={(e) => handleEmailChange('emailDomain', e.target.value)}
        >
          <option value='naver.com'>naver.com</option>
          <option value='daum.net'>daum.net</option>
          <option value='gmail.com'>gmail.com</option>
        </select>
      </div>
      {success && (
        <SuccessAlert message={success} onClose={() => setSuccess(null)} />
      )}
      <button className='mt-16 w-32 m-auto' type='submit'>
        결제하기
      </button>
    </form>
  );
};

export default Postcode;
