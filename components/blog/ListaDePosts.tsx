import dadosJson from '@/app/data/dados.json';
import React from 'react';
import * as Input from '../ui/input';
import * as Label from '../ui/dropdown';

type TDadosJson = typeof dadosJson;

// const getArticleTitle = (json: TDadosJson) => {
//   const artigo = json.data.find(function (item) {
//     return item.type === 'articles';
//   });

//   return artigo?.attributes.title;
// };

function getArticleTitle(json: TDadosJson) {
  const article = json.data.find((item) => {
    return item.type === 'articles';
  });
  return article?.attributes.title;
}

function getUser(json: TDadosJson) {
  const people = json.included.find((people) => {
    return people.type === 'people';
  });
  return {
    FullName: [people?.attributes.firstName, people?.attributes.lastName].join(
      ' ',
    ),
    Twitter: people?.attributes.twitter,
  };
}

function getComments(json: TDadosJson) {
  return json.included
    .filter((c) => c.type === 'comments')
    .map((c) => c.attributes.body)
    .join(', ');
}

const ListaDePosts = () => {
  console.log(dadosJson);

  //só html:
  return (
    <>
      <Label.Root>
        title:
        {/* <Label.Asterisk /> */}
        {/* <Label.Sub>(Optional)</Label.Sub> */}
        {/* <IconInfoCustom className='size-5 text-text-disabled-300' /> */}
      </Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getArticleTitle(dadosJson)}
          />
        </Input.Wrapper>
      </Input.Root>
      <Label.Root>Username:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getUser(dadosJson).FullName}
          />
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getUser(dadosJson).Twitter}
          />
        </Input.Wrapper>
      </Input.Root>
      <Label.Root>Comments:</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            defaultValue={getComments(dadosJson)}
          />
        </Input.Wrapper>
      </Input.Root>
    </>
  );
};

export default ListaDePosts;
