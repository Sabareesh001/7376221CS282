const axios = require('axios');

exports.topUsers = async (req, res) => {
    try {
        const testServer = process.env.TEST_SERVER;
        const userPostCounts = [];
        const authResponse = await axios.post(`${testServer}/test/auth`, process.env.CREDENTIALS);
        const token = authResponse.data.access_token;
        const usersResponse = await axios.get(`${testServer}/test/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        for(var id in usersResponse.data.users){
            const posts = await axios.get(`${testServer}/test/users/${id}/posts`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            userPostCounts.push({id,name:usersResponse.data.users[id],"noOfPosts":posts.data.posts.length})
        }

        userPostCounts.sort((a,b)=>{
           if(a.noOfPosts>=b.noOfPosts){
            return -1;
           }
           else{
            return 1;
           }
        })

        // Send the users data back to the client
        res.json(userPostCounts.slice(0,5));
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ message: "An error occurred while fetching data." });
    }
};



exports.topLatestPosts = async(req, res) => {
    try{

    const {type} = req.query;
    const resData={};
    const testServer = process.env.TEST_SERVER;
    const authResponse = await axios.post(`${testServer}/test/auth`, process.env.CREDENTIALS);
    const token = authResponse.data.access_token;
    const usersResponse = await axios.get(`${testServer}/test/users`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const AllPosts = [];
    
    for(var id in usersResponse.data.users){
        const posts = await axios.get(`${testServer}/test/users/${id}/posts`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        for (let index = 0; index < posts.data.posts.length; index++) {
            const comments = await axios.get(`${testServer}/test/posts/${posts.data.posts[index].id}/comments`,{
            headers: { Authorization: `Bearer ${token}` }
        });
             AllPosts.push({...(posts.data.posts[index]),"name":usersResponse.data.users[id],commentsCount : comments.data.comments.length});
        }
    }

    if(type=='latest'){
        AllPosts.sort((a,b)=>{
            if(Number(a.id)>=Number(b.id)){
             return -1;
            }
            else{
             return 1;
            }
         })
    }
    else{
        AllPosts.sort((a,b)=>{
            if(Number(a.commentsCount)>=Number(b.commentsCount)){
             return -1;
            }
            else{
             return 1;
            }
         })
    }
    res.send(AllPosts);
}
    catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ message: "An error occurred while fetching data." });
    }
};

