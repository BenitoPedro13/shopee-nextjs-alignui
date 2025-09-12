import React from 'react';
import dadosProductJson from '@/app/data/products.json';
import * as Input from '../ui/input';
import * as Label from '../ui/dropdown';
import { Edu_TAS_Beginner } from 'next/font/google';
import { prisma } from '@/db/client';

type TProductsJson = typeof dadosProductJson;

async function getProducy() {
  return await prisma.productdetail.findFirst({ select: { data: true } });
}

//Pegando o título do produto.
function getProductTitle(json: TProductsJson) {
  const title = json.data.item.title;
  return title;
}

//Pegando o id da imagem.
function getImageProduct(json: TProductsJson) {
  const baseUrl = 'https://down-br.img.susercontent.com/file/';
  return baseUrl + json.data.item.image;
}

//Pegando a descrição do produto.
function getDescription(json: TProductsJson) {
  const description = json.data.item.description;
  return description;
}

//Pegando a quantidade de produtos que tenho em estoque.
function getStock(json: TProductsJson) {
  const stock = json.data.item.stock;
  return stock;
}

function getPrice(json: TProductsJson) {
  const price = json.data.item.price;
  return price;
}

function getShipping(json: TProductsJson) {
  const shipping = json.data.product_shipping.ungrouped_channel_infos;
  let lessShipping = Infinity;
  return shipping.map((s, index) => {
    const edt = JSON.parse(s.edt_tracking_info);
    if (edt.edt_min < lessShipping) {
      lessShipping = edt.edt_min;
      lessIndex = index;
    }
    return {
      edt_min: edt.edt_min,
      edt_max: edt.edt_max,
    };
  });
}

let lessIndex = 0;
const shipping = getShipping(dadosProductJson);
const { edt_min, edt_max } = shipping[lessIndex];

const ProductList = async () => {
  const takeAllProducts = await getProducy();
  console.log(`takeAllProducts`, takeAllProducts);
  console.log(dadosProductJson);
  console.log(getShipping(dadosProductJson));
  return (
    <>
      <Label.Root>Title:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getProductTitle(dadosProductJson)}
          />
        </Input.Wrapper>
      </Input.Root>

      <Label.Root>Image:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <img
            src={getImageProduct(dadosProductJson)}
            alt='Product Image'
            width={'100px'}
          />
        </Input.Wrapper>
      </Input.Root>

      <Label.Root>Description:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getDescription(dadosProductJson)}
          />
        </Input.Wrapper>
      </Input.Root>

      <Label.Root>Number of products in stock:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getStock(dadosProductJson)}
          />
        </Input.Wrapper>
      </Input.Root>

      <Label.Root>Price:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getPrice(dadosProductJson)}
          />
        </Input.Wrapper>
      </Input.Root>

      <Label.Root>Shipping:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={`${edt_min} - ${edt_max}`}
          />
        </Input.Wrapper>
      </Input.Root>
    </>
  );
};

export default ProductList;
