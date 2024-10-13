package com.example.pfe;
import com.example.pfe.Domain.User;
import com.example.pfe.Repo.ClientRepo;
import com.example.pfe.Repo.ProfessionnelRepo;
import com.example.pfe.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.pfe.Repo.UserRepo;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private ProfessionnelRepo professionnelRepo;

    @Mock
    private ClientRepo clientRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testGetUserById() {
        // Arrange
        User user = new User();
        user.setUserId(1L);
        when(userRepo.findById(1L)).thenReturn(Optional.of(user));

        // Act
        User result = userService.getUserById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getUserId());
        verify(userRepo, times(1)).findById(1L);
    }
    @Test
    void testUpdateUser() {
        // Arrange
        User existingUser = new User();
        existingUser.setUserId(1L);
        existingUser.setPassword("encrypted_password");

        User updatedUser = new User();
        updatedUser.setUserId(1L);
        updatedUser.setPassword("new_password");

        when(userRepo.findById(1L)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.encode("new_password")).thenReturn("encrypted_new_password");

        // Act
        boolean result = userService.updateUser(updatedUser);

        // Assert
        assertTrue(result);
        verify(userRepo, times(1)).findById(1L);
        verify(userRepo, times(1)).save(existingUser);
        assertEquals("encrypted_new_password", existingUser.getPassword());
    }

    @Test
    void testDeleteUser() {
        // Arrange
        Long userId = 1L;
        when(userRepo.existsById(userId)).thenReturn(true);

        // Act
        boolean result = userService.deleteUser(userId);

        // Assert
        assertTrue(result);
        verify(professionnelRepo, times(1)).deleteByUserUserId(userId);
        verify(clientRepo, times(1)).deleteByUserUserId(userId);
        verify(userRepo, times(1)).deleteById(userId);
    }

    @Test
    void testDeleteUser_UserNotFound() {
        // Arrange
        Long userId = 1L;
        when(userRepo.existsById(userId)).thenReturn(false);

        // Act
        boolean result = userService.deleteUser(userId);

        // Assert
        assertFalse(result);
        verify(professionnelRepo, never()).deleteByUserUserId(userId);
        verify(clientRepo, never()).deleteByUserUserId(userId);
        verify(userRepo, never()).deleteById(userId);
    }

}
