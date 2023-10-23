import React from 'react'
import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import { fetchUser, fetchUserPosts, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from '@/components/cards/UserCard';


async function page({params} : {params: {id: string}}){

    const user =  await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(params.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

   const result = await fetchUsers({
    userId : user.id,
    searchString : '',
    pageNumber: 1,
    pageSize : 25
   })

  return (
   <section>
    <h1 className='head-text mb-10'>
        Search
    </h1>

  <div className='mt-14 flex flex-col gap-9'>
    {result.users.length == 0 ? (
      <p className='no-result'>No users</p>
    ) : (
     <>
     {result.users.map((person) => (
      <UserCard 
      key ={person.id}
      id = {person.id}
      name = {person.name}
      username = {person.username}
      imgUrl = {person.image}
      personType='User'
      />
     ))}
     </>
    )}
  </div>
   
   </section>
  )
}

export default page