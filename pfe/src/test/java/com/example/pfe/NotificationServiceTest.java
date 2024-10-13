package com.example.pfe;


import com.example.pfe.Domain.Notification;
import com.example.pfe.Repo.NotificationRepo;
import com.example.pfe.Service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;  // Import des assertions de JUnit

import static org.mockito.Mockito.*;

public class NotificationServiceTest {

    @Mock
    private NotificationRepo notificationRepo;

    @InjectMocks
    private NotificationService notificationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialiser les mocks
    }



    @Test
    void testGetNotifications() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10);
        Notification notification1 = new Notification("Notification 1", Instant.now());
        Notification notification2 = new Notification("Notification 2", Instant.now());

        Page<Notification> notificationsPage = new PageImpl<>(Arrays.asList(notification1, notification2));

        when(notificationRepo.findBy(pageable)).thenReturn(notificationsPage);

        // Act
        Page<Notification> result = notificationService.getNotifications(pageable);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        verify(notificationRepo, times(1)).findBy(pageable);
    }
}
