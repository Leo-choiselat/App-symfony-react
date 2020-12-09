<?php

namespace App\Controller;

use Exception;
use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }


    /**
     * @Route("/read", name="api_todo_read", methods={"GET"})
     */
    public function read(): Response
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];

        foreach($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_todo_create", methods={"POST"})
     * @param Request $req
     * @return JsonResponse
     */
    public function create(Request $req): Response
    {
        $content = json_decode($req->getContent());

        $form = $this->createForm(TodoType::class);
        $form->submit((array)$content);

        if(!$form->isValid()) {
            $errors = [];
            foreach($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => implode("\n", $errors), 'level' => "error"]
            ]);
        }

        $todo = new Todo();
        $todo->setName($content->name);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);    
            $this->entityManager->flush(); 
        } catch(Exception $e) {
            return $this->json([
                'message' => ['text' => ['Could not submit To-do to the database'], 'level' => "error"]
            ]);
        }
        return $this->json([
            'todo' =>  $todo->toArray(),
            'message' => ['text' => ['Todo has been created', 'Task: ' . $content->name], 'level' => "success"],
        ]);
    }

    /**
     * @Route("/update/{id}", name="api_todo_update", methods={"PUT"})
     * @param Request $req
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $req, Todo $todo): Response
    {
        $content = json_decode($req->getContent());

        $form = $this->createForm(TodoType::class);
        $form->submit((array)$content);

        if(!$form->isValid()) {
            $errors = [];
            foreach($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => implode("\n", $errors), 'level' => "error"]
            ]);
        }

        if($todo->getName() === $content->name && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => "There was no change", 'level' => "error"]
            ]);
        }

        $todo->setName($content->name);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->flush();
        } catch (Exception $e) {
            return $this->json([
                'message' => ['text' => 'Could not reach the database when attempting to update a Todo', 'level' => "error"]
            ]);
        }
        return $this->json([
            'todo' => $todo->toArray(),
            'message' =>  ['text' => 'Todo has been successfully updated !', 'level' => "success"]
        ]);
    }

    /**
     * @Route("/delete/{id}", name="api_todo_delete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $e) {
            return $this->json([
                'message' => ['text' => 'Could not reach the database when attempting to delete a Todo', 'level' => "error"]
            ]);
        }
        return $this->json([
            'message' =>  ['text' => 'Todo has been successfully deleted !', 'level' => "success"]
        ]);
    }
}
