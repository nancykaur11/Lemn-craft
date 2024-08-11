
const Asset = require('../models/Asset'); 

exports.createAsset = async (req, res) => {
    const { name, description, image, creator } = req.body;

    try {
        const asset = new Asset({ name, description, image, creator });
        await asset.save();

        res.status(201).json({
            message: 'Asset created successfully',
            asset: asset,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id).populate('creator currentHolder');
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Update asset fields
        const { name, description, image, status, isListed } = req.body;

        if (name) asset.name = name;
        if (description) asset.description = description;
        if (image) asset.image = image;
        if (status) asset.status = status;
        if (typeof isListed === 'boolean') asset.isListed = isListed;

        await asset.save();

        res.json({ message: 'Asset updated successfully', asset });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.listAssetOnMarketplace = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findById(id);

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Ensure the asset is currently a draft before listing it
        if (asset.status !== 'draft') {
            return res.status(400).json({ message: 'Asset is already listed on the marketplace' });
        }

        asset.status = 'published';
        await asset.save();

        res.json({ message: 'Asset published successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getUserAssets = async (req, res) => {
    try {
        const userId = req.user._id;
        const assets = await Asset.find({ creator: userId });
        if (!assets || assets.length === 0) {
            return res.status(404).json({ message: 'No assets found for this user' });
        }

        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getAssetsOnMarketplace = async (req, res) => {
    try {
        const assets = await Asset.find({ status: 'published' })
            .populate('creator', 'username')
            .populate('currentHolder', 'username');
        
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch marketplace assets', error: error.message });
    }
};
exports.requestToBuyAsset = async (req, res) => {
    try {
        const assetId = req.params.id; 
        const { proposedPrice } = req.body;
        if (!assetId) {
            return res.status(400).json({ message: 'Invalid asset ID' });
        }

        const asset = await Asset.findById(assetId);

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const request = new Request({
            asset: assetId,
            buyer: req.user.id,
            proposedPrice,
            status: 'pending',
        });

        await request.save();

        res.status(201).json({ message: 'Purchase request sent', requestId: request._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send purchase request', error: error.message });
    }
};
