package com.example.pfe;


import com.example.pfe.Domain.Professionnel;
import com.example.pfe.Domain.Services;
import com.example.pfe.Repo.ProfessionnelRepo;
import com.example.pfe.Repo.ServiceRepo;
import com.example.pfe.Service.ServiceService;
import com.example.pfe.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceServiceTest {

    @Mock
    private ServiceRepo serviceRepo;

    @Mock
    private ProfessionnelRepo professionnelRepo;

    @InjectMocks
    private ServiceService serviceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateService_Success() {
        // Arrange
        Professionnel professionnel = new Professionnel();
        professionnel.setIdProfessionnel(1L);

        Services service = new Services();
        service.setNom("Service Test");

        when(professionnelRepo.findById(1L)).thenReturn(Optional.of(professionnel));
        when(serviceRepo.existsByProfessionnel(professionnel)).thenReturn(false);
        when(serviceRepo.save(service)).thenReturn(service);

        // Act
        Services result = serviceService.createService(service, 1L);

        // Assert
        assertNotNull(result);
        assertEquals("Service Test", result.getNom());
        verify(serviceRepo, times(1)).save(service);
    }

    @Test
    void testCreateService_ProfessionnelNotFound() {
        // Arrange
        Services service = new Services();
        when(professionnelRepo.findById(1L)).thenReturn(Optional.empty());

        // Act
        Services result = serviceService.createService(service, 1L);

        // Assert
        assertNull(result);
        verify(serviceRepo, never()).save(service);
    }

    @Test
    void testCreateService_ServiceAlreadyExists() {
        // Arrange
        Professionnel professionnel = new Professionnel();
        professionnel.setIdProfessionnel(1L);

        Services service = new Services();
        when(professionnelRepo.findById(1L)).thenReturn(Optional.of(professionnel));
        when(serviceRepo.existsByProfessionnel(professionnel)).thenReturn(true);

        // Act
        Services result = serviceService.createService(service, 1L);

        // Assert
        assertNull(result);
        verify(serviceRepo, never()).save(service);
    }

    @Test
    void testGetServiceByProfessionnelId_Success() {
        // Arrange
        Professionnel professionnel = new Professionnel();
        professionnel.setIdProfessionnel(1L);

        Services service = new Services();
        service.setNom("Service Test");
        service.setProfessionnel(professionnel);

        when(serviceRepo.findByProfessionnel_IdProfessionnel(1L)).thenReturn(Optional.of(service));

        // Act
        Services result = serviceService.getServiceByProfessionnelId(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Service Test", result.getNom());
        verify(serviceRepo, times(1)).findByProfessionnel_IdProfessionnel(1L);
    }

    @Test
    void testGetServiceByProfessionnelId_NotFound() {
        // Arrange
        when(serviceRepo.findByProfessionnel_IdProfessionnel(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> serviceService.getServiceByProfessionnelId(1L));
    }

    @Test
    void testUpdateService_NotFound() {
        // Arrange
        Services updatedServiceDetails = new Services();
        when(serviceRepo.findByProfessionnel_IdProfessionnel(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> serviceService.updateService(1L, updatedServiceDetails));
    }

    @Test
    void testDeleteService_Success() {
        // Arrange
        Services service = new Services();
        service.setNom("Service Test");

        when(serviceRepo.findById(1L)).thenReturn(Optional.of(service));

        // Act
        serviceService.deleteService(1L);

        // Assert
        verify(serviceRepo, times(1)).delete(service);
    }

    @Test
    void testDeleteService_NotFound() {
        // Arrange
        when(serviceRepo.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> serviceService.deleteService(1L));
    }
}
