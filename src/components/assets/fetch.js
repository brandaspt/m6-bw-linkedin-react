const ENDPOINT = process.env.REACT_APP_API_URL

// Profiles functions
export const getProfiles = async callback => {
  try {
    const response = await fetch(`${ENDPOINT}/users/`)
    const data = await response.json()
    callback(data)
  } catch (error) {
    console.log(error)
  }
}

export const getProfileById = async (id, callback) => {
  try {
    const response = await fetch(`${ENDPOINT}/users/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const data = await response.json()
    callback(data)
  } catch (error) {
    console.log(error)
  }
}

export const editProfile = async (payload, id, pictureFile = null) => {
  try {
    await fetch(`${ENDPOINT}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
    if (pictureFile) {
      const imgResponse = await fetch(`${ENDPOINT}/users/${id}/uploadImage`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: pictureFile,
      })
      console.log(imgResponse)
    }
  } catch (error) {
    console.log(error)
  }
}

// Experiences functions
export const addEditExperience = async (experienceId = "", payload, id, pictureFile = null) => {
  try {
    const response = await fetch(`${ENDPOINT}/users/${id}/experiences/${experienceId}`, {
      method: experienceId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()

    if (pictureFile) {
      const imgResponse = await fetch(`${ENDPOINT}/users/${id}/experiences/${data._id}/uploadImage`, {
        method: "POST",
        headers: {},
        body: pictureFile,
      })
      console.log(imgResponse)
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteExperience = async (userId, experienceId) => {
  try {
    await fetch(`${ENDPOINT}/users/${userId}/experiences/${experienceId}`, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

// Posts functions
export const addPost = async (textPayload, imgPayload = null) => {
  try {
    const textResponse = await fetch(`${ENDPOINT}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textPayload),
    })
    const data = await textResponse.json()
    console.log(data)
    if (imgPayload) {
      const imgResponse = await fetch(`${ENDPOINT}/posts/${data._id}/uploadImage`, {
        method: "POST",
        headers: {},
        body: imgPayload,
      })
      console.log(imgResponse)
    }
  } catch (error) {
    console.log(error)
  }
}

export const getPosts = async callback => {
  try {
    const response = await fetch(`${ENDPOINT}/posts/`, {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    })
    const data = await response.json()
    callback(data.posts)
  } catch (error) {
    console.log(error)
  }
}

export const getPostById = async (postId, callback) => {
  try {
    const response = await fetch(`${ENDPOINT}/posts/${postId}`, {
      headers: {},
    })
    const data = await response.json()
    callback(data)
  } catch (error) {
    console.log(error)
  }
}
export const editPost = async (postId, payload, imgFile = null) => {
  try {
    await fetch(`${ENDPOINT}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (imgFile) {
      const imgResponse = await fetch(`${ENDPOINT}/posts/${postId}/uploadImage`, {
        method: "POST",
        headers: {},
        body: imgFile,
      })
      console.log(imgResponse)
    }
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async postId => {
  try {
    await fetch(`${ENDPOINT}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async payload => {
  try {
    const resp = await fetch(`${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await resp.json()
    if (resp.ok) {
      console.log(data.accessToken)
      localStorage.setItem("token", data.accessToken)
      return true
    } else {
      return data.message
    }
  } catch (error) {
    console.log(error)
  }
}

// Comments
// FETCH ALL COMMENTS OF POST
// GET
// export const getComments = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// POST - only current user
// export const postComments = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// DELETE -only author

// export const deleteComment = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments/${comment_id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
// if(response.ok){
//   alert("Post Deleted")
// } else{
//   alert("Could Not Delete")
// }
//   } catch (error) {
//     console.log(error);
//   }
// };

// UPDATE - only author

// export const updateComment = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments/${comment_id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// LIKES GET

// export const getLikes = async (postId) => {
//   try {
//     const res = await fetch(`${ENDPOINT}/posts/${postId}/likes`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log("get all likes", data.likes);
//       const totalLikes = data.likes.length;
//       console.log(totalLikes);
//     }
//   } catch (error) {}
// };

// export const postLikes = async (postId) => {
//   try {
//     const res = await fetch(`${endpoint}/posts/${postId}/like`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//       body: { userId },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteLikes = async (postId) => {
//   try {
//     const res = await fetch(`${endpoint}/posts/${postId}/like`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

//
