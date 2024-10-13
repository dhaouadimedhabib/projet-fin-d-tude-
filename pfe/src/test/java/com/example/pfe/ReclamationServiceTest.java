package com.example.pfe;


import com.example.pfe.Domain.Notification;
import com.example.pfe.Domain.Reclamation;
import com.example.pfe.Repo.NotificationRepo;
import com.example.pfe.Repo.ReclamationRepo;
import com.example.pfe.Service.ReclamationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReclamationServiceTest {

    @Mock
    private ReclamationRepo reclamationRepo;

    @Mock
    private NotificationRepo notificationRepo;

    @InjectMocks
    private ReclamationService reclamationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialiser les mocks
    }

    @Test
    void testSaveReclamation() {
        // Arrange
        Reclamation reclamation = new Reclamation();
        reclamation.setName("John Doe");
        Notification notification = new Notification("Nouvelle Demande de Swap", OffsetDateTime.now().toInstant());

        when(reclamationRepo.save(reclamation)).thenReturn(reclamation);
        when(notificationRepo.save(any(Notification.class))).thenReturn(notification);

        // Act
        Reclamation result = reclamationService.saveReclamation(reclamation);

        // Assert
        assertNotNull(result);
        verify(notificationRepo, times(1)).save(any(Notification.class));
        verify(reclamationRepo, times(1)).save(reclamation);
    }

    @Test
    void testDeleteReclamation_Success() {
        // Arrange
        Long reclamationId = 1L;
        when(reclamationRepo.existsById(reclamationId)).thenReturn(true);

        // Act
        reclamationService.deleteReclamation(reclamationId);

        // Assert
        verify(reclamationRepo, times(1)).deleteById(reclamationId);
    }

    @Test
    void testDeleteReclamation_NotFound() {
        // Arrange
        Long reclamationId = 1L;
        when(reclamationRepo.existsById(reclamationId)).thenReturn(false);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> reclamationService.deleteReclamation(reclamationId));
    }

    @Test
    void testGetReclamationById_Success() {
        // Arrange
        Long reclamationId = 1L;
        Reclamation reclamation = new Reclamation();
        reclamation.setName("John Doe");
        when(reclamationRepo.findById(reclamationId)).thenReturn(Optional.of(reclamation));

        // Act
        Reclamation result = reclamationService.getReclamationById(reclamationId);

        // Assert
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
    }

    @Test
    void testGetReclamationById_NotFound() {
        // Arrange
        Long reclamationId = 1L;
        when(reclamationRepo.findById(reclamationId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> reclamationService.getReclamationById(reclamationId));
    }

    @Test
    void testGetAllReclamations() {
        // Arrange
        List<Reclamation> reclamations = new ArrayList<>();
        reclamations.add(new Reclamation());
        when(reclamationRepo.findAll()).thenReturn(reclamations);

        // Act
        List<Reclamation> result = reclamationService.getAllReclamations();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(reclamationRepo, times(1)).findAll();
    }

    @Test
    void testUpdateReclamation_Success() {
        // Arrange
        Long reclamationId = 1L;
        Reclamation existingReclamation = new Reclamation();
        existingReclamation.setName("John Doe");

        Reclamation updatedReclamation = new Reclamation();
        updatedReclamation.setName("Jane Doe");
        updatedReclamation.setEmail("jane.doe@example.com");

        when(reclamationRepo.findById(reclamationId)).thenReturn(Optional.of(existingReclamation));
        when(reclamationRepo.save(existingReclamation)).thenReturn(existingReclamation);

        // Act
        Reclamation result = reclamationService.updateReclamation(reclamationId, updatedReclamation);

        // Assert
        assertNotNull(result);
        assertEquals("Jane Doe", result.getName());
        assertEquals("jane.doe@example.com", result.getEmail());
        verify(reclamationRepo, times(1)).save(existingReclamation);
    }

    @Test
    void testUpdateReclamation_NotFound() {
        // Arrange
        Long reclamationId = 1L;
        Reclamation updatedReclamation = new Reclamation();

        when(reclamationRepo.findById(reclamationId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> reclamationService.updateReclamation(reclamationId, updatedReclamation));
    }
}
