import { IStoreData } from './types';

function FileInput({ storeDataSetter }: {
  storeDataSetter: (value: React.SetStateAction<IStoreData>) => void,
}) {
  const handleFileInput = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];

      storeDataSetter((prevData) => ({
        ...prevData,
        storeLogo: selectedFile,
      }));
    }
  };

  return (
    <label htmlFor="storeImg">
      Logo da loja
      <input
        type="file"
        id="storeImg"
        accept="image/png"
        name="teste"
        onChange={ (e) => { handleFileInput(e.target.files); } }
      />
    </label>
  );
}

export default FileInput;
