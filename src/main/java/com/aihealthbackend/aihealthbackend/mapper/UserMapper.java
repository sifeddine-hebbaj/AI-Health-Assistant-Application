package com.aihealthbackend.aihealthbackend.mapper;

import com.aihealthbackend.aihealthbackend.dto.UserDto;
import com.aihealthbackend.aihealthbackend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto toUserDto(User user);

    User toUser(UserDto userDto);
}
