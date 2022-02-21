package com.example.sxmpchowseeker.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "restaurants")
@Data
@AllArgsConstructor(onConstructor = @__(@Autowired))
@NoArgsConstructor

public class Restaurant implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID", strategy = GenerationType.AUTO)
    @GenericGenerator(
            name = "id",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    private String name;
    private String locationDescription;
    private String address;
    private String photo;
    private String foodTypes;
    private float latitude;
    private float longitude;
    private String schedule;
    private String locationExact;
    private int likes;
    private int dislikes;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Comment> comments = new HashSet<>();
}
