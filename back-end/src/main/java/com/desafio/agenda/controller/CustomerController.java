package com.desafio.agenda.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.desafio.agenda.model.Customer;
import com.desafio.agenda.exception.ResourceNotFoundException;
import com.desafio.agenda.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController{
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @GetMapping("/customers")
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    //Create Customers 
    @PostMapping("/customers")
    public Customer createCustomer(@RequestBody Customer customer){
        if (customer != null) {
            return customerRepository.save(customer);
        } else {
            // Lógica para lidar com o objeto nulo, como lançar uma exceção ou retornar um status de erro
            // Aqui você pode decidir o comportamento adequado para a sua aplicação
            // Retorne null ou lance uma exceção, dependendo do caso
            return null;
        }
    }

    // Get Customer by id 
    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> customerProfile(@PathVariable Long id){
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException
            ("Cliente de id: " + id + " não existe."));
        return ResponseEntity.ok(customer);
    }

    // Update Customer 
    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, 
                                                   @RequestBody Customer customerDetails){
         Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException
            ("Cliente de id: " + id + " não existe."));

            customer.setFirstName(customerDetails.getFirstName());
            customer.setLastName(customerDetails.getLastName());
            customer.setPhoneNumber(customerDetails.getPhoneNumber());
            customer.setAddress(customerDetails.getAddress());
            customer.setEmailId(customerDetails.getEmailId());
            customer.setCpf(customerDetails.getCpf());
            customer.setCep(customerDetails.getCep());
            
        Customer updatedCustomer = customerRepository.save(customer);
        return ResponseEntity.ok(updatedCustomer);

    }

    // Delete Customer
    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCustomer(@PathVariable Long id){
        Customer customer = customerRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException
        ("Cliente de id: " + id + " não existe."));

        customerRepository.delete(customer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //Search for Customer
    // @GetMapping("/customers/search")
    //     public List<Customer> searchCustomers(@RequestParam(value = "query") String query) {
    //         List<Customer> customers = customerRepository.findAll();
    //         List<Customer> filteredCustomers = customers.stream()
    //                 .filter(customer -> customer.getFirstName().contains(query) || 
    //                                     customer.getLastName().contains(query))
    //                 .collect(Collectors.toList());
    //         return filteredCustomers;
    //     }
}