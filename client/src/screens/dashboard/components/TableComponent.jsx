import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Edit2,
  ShieldSearch,
  Trash,
} from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import SortIcon from "../../../components/icons/SortIcon";
import LoadingComponent from "../../../components/LoadingComponent";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const TableComponent = ({ customers, links, loading, refresh }) => {
  function formatRupiah(angka) {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  const navigate = useNavigate();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure(); // State untuk dialog hapus
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure(); // State untuk dialog detail

  const [selectedCustomer, setSelectedCustomer] = useState(null); // State untuk menyimpan data pelanggan yang dipilih

  function handleDelete(data) {
    setSelectedCustomer(data);
    onOpenDelete();
  }

  function handleDetail(data) {
    setSelectedCustomer(data);
    onOpenDetail();
  }

  async function handlePagination(url) {
    // console.log(url);
    await refresh(url);
  }

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="my-table">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    <span>Customer Name</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Level</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Favorite Menu</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Total Transaction</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Action</span> <SortIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.data &&
                customers.data.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>
                      <div
                        className={`bg-label ${
                          data.level === "Konglomerat"
                            ? "purple"
                            : data.level === "Sultan"
                            ? "success"
                            : data.level === "Juragan"
                            ? "primary"
                            : "warning"
                        }`}
                      >
                        <span
                          className={`label-${
                            data.level === "Konglomerat"
                              ? "purple"
                              : data.level === "Sultan"
                              ? "success"
                              : data.level === "Juragan"
                              ? "primary"
                              : "warning"
                          }`}
                        >
                          {data.level}
                        </span>
                      </div>
                    </td>
                    <td>{data.favorite_menu}</td>
                    <td>IDR {formatRupiah(data.total_transaction)}</td>
                    <td>
                      <div className="action-table">
                        <button
                          className="btn btn-sm btn-default"
                          onClick={() => handleDetail(data)}
                        >
                          <ShieldSearch size={12} />
                          <span>Detail</span>
                        </button>
                        <button
                          className="btn btn-sm btn-default"
                          onClick={() => navigate(`/edit-customer/${data.id}`)}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(data)}
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {customers.data && (
            <div className="page-navigation">
              <p>Showing {customers.data.length} Data Customers</p>
              {customers.links.length > 1 && (
                <ul className="pagination">
                  {customers.links.map((link, index) => (
                    <li
                      className={`page-item ${
                        link.rel == "current" ? "active" : ""
                      }`}
                      key={index}
                    >
                      {link.rel == "next" && (
                        <a onClick={() => handlePagination(link.url)}>
                          Next <ArrowRight size="16" />
                        </a>
                      )}
                      {link.rel == "" ||
                        (link.rel == "current" && (
                          <a onClick={() => handlePagination(link.url)}>
                            {link.title}
                          </a>
                        ))}
                      {link.rel == "prev" && (
                        <a onClick={() => handlePagination(link.url)}>
                          <ArrowLeft size="16" /> Previous
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <DetailDialog
            selectedCustomer={selectedCustomer}
            isOpen={isOpenDetail}
            onClose={onCloseDetail}
          />

          <DeleteDialog
            isOpen={isOpenDelete}
            onClose={onCloseDelete}
            selectedCustomer={selectedCustomer}
            refresh={refresh}
          />
        </div>
      )}
    </>
  );
};

function DetailDialog({ selectedCustomer, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer {selectedCustomer?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ul>
            <li>Name: {selectedCustomer?.name}</li>
            <li>Level: {selectedCustomer?.level}</li>
            <li>Favorite Menu: {selectedCustomer?.favorite_menu}</li>
            <li>Quantity: {selectedCustomer?.quantity}</li>
            <li>Total Transaction: {selectedCustomer?.total_transaction}</li>
            <li>Created At: {selectedCustomer?.created_at}</li>
            <li>Updated At: {selectedCustomer?.updated_at}</li>
          </ul>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
// Komponen AlertDialogExample
function DeleteDialog({ isOpen, onClose, selectedCustomer, refresh }) {
  const cancelRef = React.useRef();

  async function handleDeleteCustomer(e) {
    e.preventDefault();
    onClose();
    try {
      await axios.delete("/api/customer/delete/" + selectedCustomer.id);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer {selectedCustomer?.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCustomer} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default TableComponent;
