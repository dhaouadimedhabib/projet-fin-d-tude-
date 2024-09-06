class User {
  final int id;
  final int professionnelId; // New attribute
  final String username;
  final String email;
  final String firstName;
  final String lastName;
  final String numeroTel;
  final String image;
  final Set<String> roles;

  User({
    required this.id,
    required this.professionnelId, // Include in constructor
    required this.username,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.numeroTel,
    required this.image,
    required this.roles,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    // Extraire les rôles
    List<dynamic> rolesJson = json['roles'] ?? [];
    Set<String> roles = rolesJson.map((role) => role['roleName'] as String).toSet();

    return User(
      id: json['userId'] ?? 0, // Utiliser 'userId' comme clé
      professionnelId: json['professionnelId'] ?? 0, // Utiliser 'professionnelId' comme clé
      username: json['username'] ?? '',
      email: json['email'] ?? '',
      firstName: json['firstName'] ?? '',
      lastName: json['lastName'] ?? '',
      numeroTel: json['numeroTel'] ?? '',
      image: json['image'] ?? '',
      roles: roles,
    );
  }
}
