class SignupRequest {
  String username;
  String password;
  String firstName;
  String lastName;
  String email;
  String numeroTel;
  String image;
  Set<String> role; // Changed to role (singular)

  SignupRequest({
    required this.username,
    required this.password,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.numeroTel,
    required this.image,
    required this.role, // Updated to match backend
  });

  // Serialize to JSON
  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'numeroTel': numeroTel,
      'image': image,
      'role': role.toList(), // Convert Set to List for JSON
    };
  }

  // Deserialize from JSON
  factory SignupRequest.fromJson(Map<String, dynamic> json) {
    return SignupRequest(
      username: json['username'],
      password: json['password'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      numeroTel: json['numeroTel'],
      image: json['image'],
      role: Set<String>.from(json['role'] ?? []), // Convert List to Set
    );
  }
}
