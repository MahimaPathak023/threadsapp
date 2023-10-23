import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import { fetchUser } from "@/lib/actions/user.actions";
import PostThreads from "@/components/forms/PostThreads";

async function page(){

    const user =  await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding'); 

return(
<>
<h1 className="head-text text-white">Create Thread</h1>

<PostThreads userId ={userInfo._id}  />
</>
)
}

export default page