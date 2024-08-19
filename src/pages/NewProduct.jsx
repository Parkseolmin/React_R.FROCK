import React, { useRef, useState } from 'react';
import Button from '../ui/Button';
import { IoImagesOutline } from 'react-icons/io5';
import { uploadImage } from '../api/uploader';
// import { addNewProduct } from "../api/firebase";
import SuccessAlert from '../ui/SuccessAlert';
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from 'hooks/useProducts';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const fileInputRef = useRef(null);
  // const queryClient = useQueryClient();
  // const addProduct = useMutation({
  //   mutationFn: ({ product, url }) => addNewProduct(product, url),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["products"] });
  //   },
  // });
  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess('성공적으로 제품이 추가되었습니다.');
              setTimeout(() => {
                setSuccess(null);
              }, 2000);
              setProduct({});
              setFile(undefined);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  return (
    <section className='sectionContents w-full text-center'>
      <h2 className='text-2xl font-bold my-20'>새로운 제품 등록</h2>
      {success && (
        <SuccessAlert message={success} onClose={() => setSuccess(null)} />
      )}
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-1/2'>
          {file ? (
            <img
              className='w-80 mx-auto'
              src={URL.createObjectURL(file)}
              alt='local file'
            />
          ) : (
            <div
              onClick={triggerFileInput}
              className='w-96 h-96 border border-double mx-auto flex items-center justify-center cursor-pointer'
            >
              <IoImagesOutline className='text-gray-500' />
            </div>
          )}
        </div>

        <form
          className='flex flex-col gap-5 px-12 w-1/2'
          onSubmit={handleSubmit}
        >
          <input
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange}
            ref={fileInputRef} // ref 속성으로 참조 연결
            style={{ display: 'none' }} // 입력 필드 숨기기
          />
          <input
            type='text'
            name='title'
            value={product.title ?? ''}
            placeholder='Product Name'
            required
            autoComplete='off'
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            value={product.price ?? ''}
            placeholder='Product price'
            required
            autoComplete='off'
            onChange={handleChange}
          />
          <input
            type='text'
            name='category'
            value={product.category ?? ''}
            placeholder='Product category'
            required
            autoComplete='off'
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            value={product.description ?? ''}
            placeholder='Product description'
            required
            autoComplete='off'
            onChange={handleChange}
          />
          <input
            type='text'
            name='options'
            value={product.options ?? ''}
            placeholder='옵션들(콤마( , )로 구분'
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? '업로드 중' : '제품 등록'}
            disabled={isUploading}
          />
        </form>
      </div>
    </section>
  );
}
