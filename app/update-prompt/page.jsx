"use client";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense  } from "react";

import Form from "@components/Form";


const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptID = searchParams.get('id')

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptID) getPromptDetails();
  }, [promptID]);

  const _updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptID) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={_updatePrompt}
    />
  );
}

export default UpdatePrompt