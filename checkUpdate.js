const canUpdate = () => {
    const currentVersion = true;
    const fetchVersion = true;

    return currentVersion != fetchVersion
}

export default canUpdate;
