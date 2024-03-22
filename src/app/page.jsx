"use client";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useArticles } from "../features/useArticles";
import { formik, useFormik } from "formik";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { useCreateArticle } from "@/features/useCreateArticle";
import { useDeleteArticle } from "@/features/useDeleteArticle";
import { useUpdateArticle } from "@/features/useUpdateArticle";

export default function Home() {
  const { data: articles, isLoading, refetch: refetchArticles } = useArticles();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      author_id: "",
      category_id: "",
      title: "",
      text: "",
      image: "",
      id: "",
    },
    onSubmit: async () => {
      const { author_id, category_id, title, text, image, id } = formik.values;
      console.log(formik.values);

      if (id) {
        updateArticle({
          author_id,
          category_id,
          title,
          text,
          image,
          id,
        });
      } else {
        createArticle({
          author_id,
          category_id,
          title,
          text,
          image,
        });
        formik.setFieldValue("author_id", "");
        formik.setFieldValue("category_id", "");
        formik.setFieldValue("title", "");
        formik.setFieldValue("text", "");
        formik.setFieldValue("image", "");
      }
    },
  });

  const {
    mutate: createArticle,
    isLoading: CreateProductIsLoading,
  } = useCreateArticle({
    onSuccess: () => {
      refetchArticles();
      toast({
        title: "Article Created",
        status: "success",
      });
    },
  });

  const confirmDelete = (articleId) => {
    const shouldDelete = confirm("Sure to Delete?");

    if (shouldDelete) {
      deleteArticle(articleId);
    }
  };
  const { mutate: deleteArticle } = useDeleteArticle({
    onSuccess: () => {
      refetchArticles();
      toast({
        title: "Article Deleted",
        status: "success",
      });
    },
  });

  const { mutate: updateArticle } = useUpdateArticle({
    onSuccess: () => {
      refetchArticles();
      toast({
        title: "Article Updated",
        status: "success",
      });
    },
  });

  const handleClickEdit = (article) => {
    formik.setFieldValue("id", article.id);
    formik.setFieldValue("author_id", article.author_id);
    formik.setFieldValue("category_id", article.category_id);
    formik.setFieldValue("title", article.title);
    formik.setFieldValue("text", article.text);
    formik.setFieldValue("image", article.image);
  };

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const ArticleData = () => {
    return articles?.map((article, i) => {
      return (
        <Tr key={i}>
          <Td>{i + 1}</Td>
          <Td>{article.title}</Td>
          <Td>
            <Button onClick={() => confirmDelete(article.id)} colorScheme="red">
              Delete
            </Button>
            <Button onClick={() => handleClickEdit(article)} colorScheme="red">
              Edit
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <Table margin="5">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Title</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <ArticleData />
        </Tbody>
      </Table>

      <form onSubmit={formik.handleSubmit}>
        <VStack spacing="3">
          <FormControl>
            <Input
              onChange={handleFormInput}
              type="hidden"
              name="id"
              value={formik.values.id}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author Id</FormLabel>
            <Input
              onChange={handleFormInput}
              type="number"
              name="author_id"
              value={formik.values.author_id}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category Id</FormLabel>
            <Input
              onChange={handleFormInput}
              type="number"
              name="category_id"
              value={formik.values.category_id}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Title Name</FormLabel>
            <Input
              onChange={handleFormInput}
              type="text"
              name="title"
              value={formik.values.title}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Article Text</FormLabel>
            <Input
              onChange={handleFormInput}
              type="text"
              name="text"
              value={formik.values.text}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              onChange={handleFormInput}
              type="text"
              name="image"
              value={formik.values.image}
            />
          </FormControl>
          {CreateProductIsLoading ? (
            <Spinner />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </VStack>
      </form>
    </>
  );
}
