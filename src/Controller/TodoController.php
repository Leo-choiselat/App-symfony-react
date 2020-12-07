<?php

namespace App\Controller;

use App\Entity\Todo;
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
    public function index(): Response
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
        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);    
            $this->entityManager->flush(); 
            return $this->json([
                'todo' =>  $todo->toArray(),
            ]);
        } catch (Exception $e) {
            
        }
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

        $todo->setName($content->name);

        try {
            $this->entityManager->flush();
        } catch (Exception $e) {
            
        }
        return $this->json([
            'message' => 'todo has been updated'
        ]);
    }

    /**
     * @Route("/delete", name="api_todo_delete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $e) {
            
        }
        return $this->json([
            'message' => 'todo has been deleted'
        ]);
    }
}
