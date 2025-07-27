import { deleteLink } from "@/app/actions"
import { faEye, faLink, faPen, faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

type user =
  | {
      name?: string | null
      email?: string | null
      image?: string | null
    }
  | undefined

interface Props {
  name: string
  redirect: string
  pinned: boolean
  createdBy: string
  description: string
  views: number
  user: user
  loggedIn: boolean
  refreshFlag: boolean
  setRefreshFlag: Dispatch<SetStateAction<boolean>>
}

export default function ShortLink({
  name,
  redirect,
  pinned,
  createdBy,
  description,
  views,
  user,
  loggedIn,
  setRefreshFlag,
  refreshFlag,
}: Props) {
  const deleteSelf = async () => {
    await deleteLink(name)
    setRefreshFlag(!refreshFlag)
  }

  return (
    <div className="bg-white opacity-90 p-6 m-1 mx-10 rounded-xl shadow-md min-w-200">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h4 className="font-bold text-lg">{name}</h4>
          <a
            href={redirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex gap-1 items-center"
          >
            <FontAwesomeIcon icon={faLink} />
            {redirect}
          </a>
        </div>
        {pinned && <FontAwesomeIcon icon={faThumbTack} className="text-gray-500" />}
      </div>
      <p>{description}</p>
      {loggedIn && (
        <div className="flex justify-between items-center text-sm pt-5">
          <div className="flex items-center gap-5">
            <div className="flex gap-1 items-center">
              <Image
                width={25}
                height={25}
                src={`https://avatars.githubusercontent.com/${createdBy}`}
                className="w-5 h-5 rounded-full"
                alt="created user"
              />
              <span className="text-gray-500">Created by</span>
              <span>{createdBy}</span>
            </div>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faEye} />
              <span className="text-gray-500">Views</span>
              <span>{views}</span>
            </div>
          </div>
          <div className="flex text-gray-500 gap-1">
            <FontAwesomeIcon
              icon={faPen}
              cursor="pointer"
              className="hover:text-gray-800 transition"
            />
            <FontAwesomeIcon
              icon={faTrash}
              cursor="pointer"
              className="hover:text-red-600 transition"
              onClick={deleteSelf}
            />
          </div>
        </div>
      )}
    </div>
  )
}
