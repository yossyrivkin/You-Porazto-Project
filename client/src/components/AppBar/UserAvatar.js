import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
    console.log(color);
  }
  /* eslint-enable no-bitwise */
  console.log(color);

  return color;
}

function displayAvatar(name, image) {
  const nameProps = {
    sx: {
     bgcolor: stringToColor(name),
     width: 35,
     height: 35,
     border: `2px solid gray`,

    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }

  const imageProps = {
    sx: {
      width: 40,
      height: 40, 
      border: `2px solid whitesmoke`,

    },
    src: image,
  };
  if (image) {
    return imageProps
  }
  else {
    return nameProps
  }
}

export default function UserAvatar({ userName, userImage }) {
  return (
      <Avatar {...displayAvatar(userName, userImage)} />
  );
}